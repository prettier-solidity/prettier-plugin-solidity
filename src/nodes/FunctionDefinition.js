const {
  doc: {
    builders: { concat, group, indent, join, line }
  }
} = require('prettier');

const functionName = node => {
  if (node.isConstructor && !node.name) {
    return 'constructor';
  } else if (node.name) {
    return `function ${node.name}`;
  } else {
    return 'function';
  }
};

const visibility = node => {
  if (node.visibility && node.visibility !== 'default')
    return concat([line, node.visibility]);
};

const stateMutability = node => {
  if (node.stateMutability && node.stateMutability !== 'default')
    return concat([line, node.stateMutability]);
};

const modifiers = (node, path, print) => {
  if (node.modifiers.length > 0)
    return concat([line, join(line, path.map(print, 'modifiers'))]);
};

const returnParameters = (node, path, print) => {
  if (node.returnParameters)
    return concat([
      line,
      'returns (',
      path.call(print, 'returnParameters'),
      ')'
    ]);
};

const abstractFunctionSemicolon = node => {
  if (!node.body) return ';';
};

const body = (node, path, print) => {
  if (node.body) return concat([' ', path.call(print, 'body')]);
};

const FunctionDefinition = {
  print: ({ node, path, print }) =>
    concat(
      [
        functionName(node),
        '(',
        path.call(print, 'parameters'),
        ')',
        indent(
          group(
            concat(
              [
                visibility(node),
                stateMutability(node),
                modifiers(node, path, print),
                returnParameters(node, path, print),
                abstractFunctionSemicolon(node)
              ].filter(element => element)
            )
          )
        ),
        body(node, path, print)
      ].filter(element => element)
    )
};

module.exports = FunctionDefinition;
