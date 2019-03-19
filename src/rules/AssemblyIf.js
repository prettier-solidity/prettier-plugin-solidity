const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const AssemblyIf = (node, path, options, print) => {
  return concat([
    'if ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]);
};

module.exports = AssemblyIf;
