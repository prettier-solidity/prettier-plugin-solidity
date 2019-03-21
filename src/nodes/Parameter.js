const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const Parameter = {
  print: ({ node, path, print }) => {
    let doc = path.call(print, 'typeName');
    doc = join(
      ' ',
      [
        doc,
        node.storageLocation,
        node.typeName.stateMutability,
        node.name
      ].filter(element => element)
    );
    return doc;
  }
};

module.exports = Parameter;
