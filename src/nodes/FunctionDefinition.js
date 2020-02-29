const {
  doc: {
    builders: { concat, dedent, group, indent, join, line }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const functionName = node => {
  if (node.isConstructor && !node.name) return 'constructor';
  if (node.name) return `function ${node.name}`;
  return 'function';
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
  print: ({ node, path, print }) =>
    concat([
      functionName(node),
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
