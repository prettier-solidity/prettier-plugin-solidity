const {
  builders: { group }
} = require('prettier/doc');

const UncheckedStatement = {
  print: ({ path, print }) => group(['unchecked ', path.call(print, 'block')])
};

module.exports = UncheckedStatement;
