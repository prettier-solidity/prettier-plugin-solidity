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

const visibility = node => {
  if (node.visibility && node.visibility !== 'default') {
    return concat([line, node.visibility]);
  }
  return '';
};

const virtual = node => {
  if (node.isVirtual) {
    return concat([line, 'virtual']);
  }
  return '';
};

const stateMutability = node => {
  if (node.stateMutability && node.stateMutability !== 'default') {
    return concat([line, node.stateMutability]);
  }
  return '';
};

const modifiers = (node, path, print) => {
  if (node.modifiers.length > 0) {
    return concat([line, join(line, path.map(print, 'modifiers'))]);
  }
  return '';
};

const returnParameters = (node, path, print) => {
  if (node.returnParameters) {
    return concat([
      line,
      'returns (',
      parameters('returnParameters', node, path, print),
      ')'
    ]);
  }
  return '';
};

const signatureEnd = node => {
  if (node.body) return dedent(line);
  return ';';
};

const body = (node, path, print) => {
  if (node.body) return path.call(print, 'body');
  return '';
};

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
