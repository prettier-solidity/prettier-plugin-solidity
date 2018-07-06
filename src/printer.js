// https://prettier.io/docs/en/plugins.html#printers
const { concat, hardline, join } = require('prettier').doc.builders;

const space = ' ';

const genericPrint = (path, options, print) => {
  const node = path.getValue();

  switch (node.type) {
    case 'SourceUnit':
      return join(hardline, path.map(print, 'children'));
    case 'PragmaDirective':
      return concat([
        'pragma',
        space,
        node.name,
        space,
        node.value,
        ';',
        hardline
      ]);
    default:
      return concat([
        options.originalText.slice(node.range[0], node.range[1] + 1),
        hardline
      ]);
  }
};

module.exports = genericPrint;
