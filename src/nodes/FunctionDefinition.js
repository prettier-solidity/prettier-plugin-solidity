const {
  doc: {
    builders: { concat, dedent, group, hardline, indent, join, line }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const functionName = (node, options) => {
  if (node.isConstructor && !node.name) return 'constructor';
  if (node.name) return `function ${node.name}`;
  if (node.isReceiveEther) return 'receive';
  // The parser doesn't give us any information about the keyword used for the
  // fallback.
  // Using the originalText is the next best option.
  // A neat idea would be to rely on the pragma and enforce it but for the
  // moment this will do.
  const names = { fallback: 'fallback', function: 'function' };
  const name = options.originalText.slice(
    options.locStart(node),
    options.locStart(node) + 8
  );
  return names[name];
};

const parameters = (parametersType, node, path, print) =>
  node[parametersType] && node[parametersType].length > 0
    ? printSeparatedList(path.map(print, parametersType), {
        separator: concat([
          ',',
          // To keep consistency any list of parameters will split if it's longer than 2.
          // For more information see:
          // https://github.com/prettier-solidity/prettier-plugin-solidity/issues/256
          node[parametersType].length > 2 ? hardline : line
        ])
      })
    : '';

const visibility = (node) =>
  node.visibility && node.visibility !== 'default'
    ? concat([line, node.visibility])
    : '';

const virtual = (node) => (node.isVirtual ? concat([line, 'virtual']) : '');

const override = (node, path, print) => {
  if (!node.override) return '';
  if (node.override.length === 0) return concat([line, 'override']);
  return concat([
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ]);
};

const stateMutability = (node) =>
  node.stateMutability && node.stateMutability !== 'default'
    ? concat([line, node.stateMutability])
    : '';

const modifiers = (node, path, print) =>
  node.modifiers.length > 0
    ? concat([line, join(line, path.map(print, 'modifiers'))])
    : '';

const returnParameters = (node, path, print) =>
  node.returnParameters
    ? concat([
        line,
        'returns (',
        parameters('returnParameters', node, path, print),
        ')'
      ])
    : '';

const signatureEnd = (node) => (node.body ? dedent(line) : ';');

const body = (node, path, print) => (node.body ? path.call(print, 'body') : '');

const FunctionDefinition = {
  print: ({ node, path, print, options }) =>
    concat([
      functionName(node, options),
      '(',
      parameters('parameters', node, path, print),
      ')',
      indent(
        group(
          concat([
            visibility(node),
            stateMutability(node),
            virtual(node),
            override(node, path, print),
            modifiers(node, path, print),
            returnParameters(node, path, print),
            signatureEnd(node)
          ])
        )
      ),
      body(node, path, print)
    ])
};

module.exports = FunctionDefinition;
