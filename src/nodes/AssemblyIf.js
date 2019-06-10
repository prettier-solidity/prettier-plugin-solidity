const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const AssemblyIf = {
  print: ({ path, print }) =>
    concat([
      'if ',
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'body')
    ])
};

module.exports = AssemblyIf;
