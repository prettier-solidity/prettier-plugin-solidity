const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const EnumDefinition = {
  print: ({ node, path, print, options }) =>
    group(
      concat([
        'enum ',
        node.name,
        ' {',
        indent(
          concat([
            options.bracketSpacing ? line : softline,
            join(concat([',', line]), path.map(print, 'members'))
          ])
        ),
        options.bracketSpacing ? line : softline,
        '}'
      ])
    )
};

module.exports = EnumDefinition;
