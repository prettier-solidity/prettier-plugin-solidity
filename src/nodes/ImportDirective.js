const {
  doc: {
    builders: { concat, group, line, softline }
  }
} = require('prettier/standalone');
const printList = require('./print-list');
const { printString } = require('../prettier-comments/common/util');

const ImportDirective = {
  print: ({ node, options }) => {
    let doc = printString(node.path, options);

    if (node.unitAlias) {
      doc = concat([doc, ' as ', node.unitAlias]);
    } else if (node.symbolAliases) {
      doc = concat([
        '{',
        printList(
          node.symbolAliases.map(([a, b]) => (b ? `${a} as ${b}` : a)),
          { firstSeparator: options.bracketSpacing ? line : softline }
        ),
        '} from ',
        doc
      ]);
    }
    return group(concat(['import ', doc, ';']));
  }
};

module.exports = ImportDirective;
