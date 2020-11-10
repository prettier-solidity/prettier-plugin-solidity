const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const FileLevelConstant = {
  print: ({ node, path, print }) => {
    return concat([
      path.call(print, 'typeName'),
      ' constant ',
      node.name,
      ' = ',
      path.call(print, 'initialValue'),
      ';'
    ]);
  }
};

module.exports = FileLevelConstant;
