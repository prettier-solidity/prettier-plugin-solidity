const {
  doc: {
    builders: { concat, line }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const AssemblyLocalDefinition = {
  print: ({ path, print }) =>
    concat([
      'let',
      printList(path.map(print, 'names'), { firstSeparator: line }),
      ':= ',
      path.call(print, 'expression')
    ])
};

module.exports = AssemblyLocalDefinition;
