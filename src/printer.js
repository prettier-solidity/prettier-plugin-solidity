// https://prettier.io/docs/en/plugins.html#printers
const { concat, line } = require('prettier').doc.builders;

const space = ' ';

const genericPrint = (path, options) => {
  const node = path.getValue();
  const lines = options.originalText.split('\n');
  const parts = [];

  switch (node.type) {
    case 'SourceUnit':
      node.children.forEach(child => {
        switch (child.type) {
          case 'PragmaDirective':
            parts.push(
              concat([
                'pragma',
                space,
                child.name,
                space,
                child.value,
                ';',
                line,
                line
              ])
            );
            break;
          default:
            for (
              let index = child.loc.start.line;
              index <= child.loc.end.line;
              index += 1
            ) {
              parts.push(concat([lines[index - 1], line]));
            }
            break;
        }
      });
      return concat(parts);
    default:
      throw Error('UNKNOWN NODE TYPE');
  }
};

module.exports = genericPrint;
