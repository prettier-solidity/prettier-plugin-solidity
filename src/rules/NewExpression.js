const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const NewExpression = (node, path, options, print) => {
  return concat(['new ', path.call(print, 'typeName')]);
};

module.exports = NewExpression;
