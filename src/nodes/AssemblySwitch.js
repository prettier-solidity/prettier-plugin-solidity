const {
  doc: {
    builders: { concat, hardline }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const AssemblySwitch = {
  print: ({ path, print }) =>
    concat([
      'switch ',
      path.call(print, 'expression'),
      printList(path.map(print, 'cases'), hardline, hardline, '')
    ])
};

module.exports = AssemblySwitch;
