const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const UncheckedStatement = {
  print: ({ path, print }) => concat(['unchecked ', path.call(print, 'block')])
};

module.exports = UncheckedStatement;
