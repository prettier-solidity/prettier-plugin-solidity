const {
  doc: {
    builders: { concat, dedent, group, indent, join, line }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

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
    ? printList(path.map(print, parametersType))
    : '';

const visibility = node =>
  node.visibility && node.visibility !== 'default'
    ? concat([line, node.visibility])
    : '';

const virtual = node => (node.isVirtual ? concat([line, 'virtual']) : '');

const stateMutability = node =>
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

const signatureEnd = node => (node.body ? dedent(line) : ';');

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
            virtual(node),
            stateMutability(node),
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
