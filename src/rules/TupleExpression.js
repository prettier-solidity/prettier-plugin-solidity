const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const TupleExpression = (node, path, options, print) => {
  let doc;
  // @TODO: remove hack once solidity-parser-antlr is fixed
  if (node.components) {
    doc = join(', ', path.map(print, 'components'));
  } else {
    doc = join(', ', path.map(print, 'elements'));
  }
  if (node.isArray) {
    return concat(['[', doc, ']']);
  }
  return concat(['(', doc, ')']);
};

module.exports = TupleExpression;
