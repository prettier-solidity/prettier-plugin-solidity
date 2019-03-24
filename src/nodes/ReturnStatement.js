const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const ReturnStatement = {
  print: ({ node, path, print }) => {
    let doc = 'return';
    if (node.expression) {
      doc = join(' ', [doc, path.call(print, 'expression')]);
    }
    return concat([doc, ';']);
  }
};

module.exports = ReturnStatement;
