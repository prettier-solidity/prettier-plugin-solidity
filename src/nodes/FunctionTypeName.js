const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const FunctionTypeName = {
  print: ({ node, path, print }) => {
    const returns = returnTypes => {
      if (returnTypes.length > 0) {
        return concat([
          'returns (',
          join(', ', path.map(print, 'returnTypes')),
          ')'
        ]);
      }
      return null;
    };

    return join(
      ' ',
      [
        concat([
          'function(',
          join(', ', path.map(print, 'parameterTypes')),
          ')'
        ]),
        returns(node.returnTypes),
        node.visibility === 'default' ? null : node.visibility,
        node.stateMutability
      ].filter(element => element)
    );
  }
};

module.exports = FunctionTypeName;
