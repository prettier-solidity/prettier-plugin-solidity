const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const WhileStatement = {
  print: ({ path, print }) =>
    concat([
      'unchecked ',
      path.call(print, 'block')
    ])
};

module.exports = WhileStatement;
