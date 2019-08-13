const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const HexLiteral = {
  print: ({ node, options }) =>
    concat(
      options.singleQuote
        ? ["hex'", node.value.slice(4, -1), "'"]
        : ['hex"', node.value.slice(4, -1), '"']
    )
};

module.exports = HexLiteral;
