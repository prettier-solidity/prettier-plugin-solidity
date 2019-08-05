const {
  doc: {
    builders: { concat, join }
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
        join(
          ', ',
          node.symbolAliases.map(([a, b]) => (b ? [a, b].join(' as ') : a))
        ),
        '} from ',
        doc
      ]);
    }
    return concat(['import ', doc, ';']);
  }
};

module.exports = ImportDirective;
