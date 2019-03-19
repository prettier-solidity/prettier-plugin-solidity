/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat, hardline, indent, join, line }
  }
} = require('prettier');

const StructDefinition = (node, path, options, print) =>
  concat([
    'struct ',
    node.name,
    ' {',
    indent(line),
    indent(
      join(
        hardline,
        path.map(print, 'members').map(element => concat([element, ';']))
      )
    ),
    hardline,
    '}'
  ]);

module.exports = StructDefinition;
