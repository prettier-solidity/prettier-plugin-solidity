const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const NewExpression = {
  print: ({ path, print }) => concat(['new ', path.call(print, 'typeName')])
};

module.exports = NewExpression;
