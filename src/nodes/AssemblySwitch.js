const {
  doc: {
    builders: { concat, hardline }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const AssemblySwitch = {
  print: ({ path, print }) =>
    concat([
      'switch ',
      path.call(print, 'expression'),
      printSeparatedList(path.map(print, 'cases'), {
        firstSeparator: hardline,
        separator: hardline,
        lastSeparator: ''
      })
    ])
};

module.exports = AssemblySwitch;
