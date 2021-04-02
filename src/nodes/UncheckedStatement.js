const {
  doc: {
    builders: { concat, group }
  }
} = require('prettier/standalone');

const UncheckedStatement = {
  print: ({ path, print }) =>
    group(concat(['unchecked ', path.call(print, 'block')]))
};

module.exports = UncheckedStatement;
