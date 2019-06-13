const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const EmitStatement = {
  print: ({ path, print }) =>
    concat(['emit ', path.call(print, 'eventCall'), ';'])
};

module.exports = EmitStatement;
