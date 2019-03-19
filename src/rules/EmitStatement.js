const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const EmitStatement = (node, path, options, print) => {
  return concat(['emit ', path.call(print, 'eventCall'), ';']);
};

module.exports = EmitStatement;
