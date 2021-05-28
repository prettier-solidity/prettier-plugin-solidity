const {
  doc: {
    builders: { hardline }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const AssemblySwitch = {
  print: ({ path, print }) => [
    'switch ',
    path.call(print, 'expression'),
    printSeparatedList(path.map(print, 'cases'), {
      firstSeparator: hardline,
      separator: hardline,
      lastSeparator: ''
    })
  ]
};

module.exports = AssemblySwitch;
