const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const ModifierInvocation = {
  print: ({ node, path, print }) => {
    let doc = node.name;
    if (node.arguments) {
      doc = concat([doc, '(', join(', ', path.map(print, 'arguments')), ')']);
    }
    return doc;
  }
};

module.exports = ModifierInvocation;
