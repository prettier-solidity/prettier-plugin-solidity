const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');
const { printString } = require('../prettier-comments/common/util');

const ImportDirective = {
  print: ({ node, options }) => {
    let doc = printString(node.path, options);

    if (node.unitAlias) {
      doc = concat([doc, ' as ', node.unitAlias]);
    } else if (node.symbolAliases) {
      doc = concat([
        '{',
        indent(
          concat([
            options.bracketSpacing ? line : softline,
            join(
              concat([',', line]),
              node.symbolAliases.map(([a, b]) => (b ? `${a} as ${b}` : a))
            )
          ])
        ),
        options.bracketSpacing ? line : softline,
        '} from ',
        doc
      ]);
    }
    return group(concat(['import ', doc, ';']));
  }
};

module.exports = ImportDirective;
