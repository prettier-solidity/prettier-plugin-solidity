const {
  doc: {
    builders: { join }
  }
} = require('prettier/standalone');

const VariableDeclaration = {
  print: ({ node, path, print }) => {
    if (!node.typeName) {
      return node.name;
    }
    let doc = path.call(print, 'typeName');
    if (node.isIndexed) {
      doc = join(' ', [doc, 'indexed']);
    }
    const constantKeyword = node.isDeclaredConst ? 'constant' : '';
    if (node.visibility === 'default') {
      return join(
        ' ',
        [doc, node.typeName.stateMutability, constantKeyword, node.name].filter(
          element => element
        )
      );
    }
    return join(
      ' ',
      [
        doc,
        node.typeName.stateMutability,
        node.visibility,
        constantKeyword,
        node.storageLocation,
        node.name
      ].filter(element => element)
    );
  }
};

module.exports = VariableDeclaration;
