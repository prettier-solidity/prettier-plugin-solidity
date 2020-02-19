const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const AssemblyCase = {
  print: ({ node, path, print }) =>
    concat([
      node.default ? 'default' : concat(['case ', path.call(print, 'value')]),
      ' ',
      path.call(print, 'block')
    ])
};

module.exports = AssemblyCase;
