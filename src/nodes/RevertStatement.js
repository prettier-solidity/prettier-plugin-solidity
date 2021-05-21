const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const RevertStatement = {
  print: ({ path, print }) =>
    concat(['revert ', path.call(print, 'revertCall'), ';'])
};

module.exports = RevertStatement;
