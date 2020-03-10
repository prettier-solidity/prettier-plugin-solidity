const {
  doc: {
    builders: { concat, group, line, softline }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const EnumDefinition = {
  print: ({ node, path, print, options }) =>
    group(
      concat([
        'enum ',
        node.name,
        ' {',
        printSeparatedList(path.map(print, 'members'), {
          firstSeparator: options.bracketSpacing ? line : softline
        }),
        '}'
      ])
    )
};

module.exports = EnumDefinition;
