const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const parameterTypes = (node, path, print) =>
  group(
    concat([
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'parameterTypes'))
        ])
      ),
      softline
    ])
  );

const returnTypes = (node, path, print) => {
  if (node.returnTypes.length > 0) {
    return concat([
      line,
      'returns (',
      join(', ', path.map(print, 'returnTypes')),
      ')'
    ]);
  }
  return '';
};

const visibility = node => {
  if (node.visibility && node.visibility !== 'default') {
    return concat([line, node.visibility]);
  }
  return '';
};

const stateMutability = node => {
  if (node.stateMutability && node.stateMutability !== 'default') {
    return concat([line, node.stateMutability]);
  }
  return '';
};

const FunctionTypeName = {
  print: ({ node, path, print }) =>
    concat([
      'function(',
      parameterTypes(node, path, print),
      ')',
      indent(
        group(
          concat([
            returnTypes(node, path, print),
            visibility(node),
            stateMutability(node)
          ])
        )
      )
    ])
};

module.exports = FunctionTypeName;
