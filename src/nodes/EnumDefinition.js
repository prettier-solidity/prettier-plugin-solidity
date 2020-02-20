const {
  doc: {
    builders: { concat, group, line, softline }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const EnumDefinition = {
  print: ({ node, path, print, options }) =>
    group(
      concat([
        'enum ',
        node.name,
        ' {',
        printList(path.map(print, 'members'), {
          firstSeparator: options.bracketSpacing ? line : softline
        }),
        '}'
      ])
    )
};

module.exports = EnumDefinition;
