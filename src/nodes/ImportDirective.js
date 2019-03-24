const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const ImportDirective = {
  print: ({ node }) => {
    // @TODO: handle proper escaping
    let doc = concat(['"', node.path, '"']);

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
