// https://prettier.io/docs/en/plugins.html#printers
const { concat, hardline, literalline, indent, join } = require('prettier').doc.builders;

const space = ' ';

const genericPrint = (path, options, print) => {
  const node = path.getValue();

  switch (node.type) {
    case 'SourceUnit':
      return join(hardline, path.map(print, 'children'));
    case 'PragmaDirective':
      return concat([join(space, ['pragma', node.name, node.value]), ';']);
    case 'ContractDefinition':
      return concat([
        join(space, [node.kind, node.name, '{']),
        indent(concat([hardline, join(hardline, path.map(print, 'subNodes'))])),
        '}'
      ]);
    default:
      return concat(
        options.originalText
          .slice(node.range[0], node.range[1] + 1)
          .split('\n')
          .reduce((arr, el) => arr.concat(literalline, el), [])
          .slice(1)
      );
  }
};

module.exports = genericPrint;
