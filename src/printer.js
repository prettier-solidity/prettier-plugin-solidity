// https://prettier.io/docs/en/plugins.html#printers
const PRAGMA_DIRECTIVE = 'PragmaDirective';
const SOURCE_UNIT = 'SourceUnit';
const UNKNOWN_NODE_TYPE = 'UNKNOWN NODE TYPE';

const genericPrint = (path, options) => {
  const node = path.getValue();
  const lines = options.originalText.split('\n');
  switch (node.type) {
    case SOURCE_UNIT:
      node.children.forEach(child => {
        switch (child.type) {
          case PRAGMA_DIRECTIVE:
            if (child.loc.start.line === child.loc.end.line) {
              lines[child.loc.start.line - 1] = `pragma ${child.name} ${
                child.value
              };`;
            }
            break;
          default:
            break;
        }
      });
      lines.push('');
      return lines.join('\n');
    default:
      throw Error(UNKNOWN_NODE_TYPE);
  }
};

module.exports = genericPrint;
