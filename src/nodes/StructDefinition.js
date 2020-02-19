const {
  doc: {
    builders: { concat, hardline }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const StructDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'struct ',
      node.name,
      ' {',
      printList(
        path.map(print, 'members').map(element => concat([element, ';'])),
        hardline,
        hardline
      ),
      '}'
    ])
};

module.exports = StructDefinition;
