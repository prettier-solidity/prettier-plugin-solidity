const {
  doc: {
    builders: { concat, line }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const AssemblyLocalDefinition = {
  print: ({ path, print }) =>
    concat([
      'let',
      printSeparatedList(path.map(print, 'names'), { firstSeparator: line }),
      ':= ',
      path.call(print, 'expression')
    ])
};

module.exports = AssemblyLocalDefinition;
