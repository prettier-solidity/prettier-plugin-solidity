const {
  doc: {
    builders: { concat, hardline, indent, join, line }
  }
} = require('prettier/standalone');

const StructDefinition = {
  print: ({ node, path, print }) =>
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
    ])
};

module.exports = StructDefinition;
