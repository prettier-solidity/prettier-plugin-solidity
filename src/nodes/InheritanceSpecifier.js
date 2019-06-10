const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const InheritanceSpecifier = {
  print: ({ node, path, print }) => {
    let parts = [path.call(print, 'baseName')];

    if (node.arguments && node.arguments.length) {
      parts.push('(');
      parts = parts.concat(path.map(print, 'arguments'));
      parts.push(')');
    }

    return concat(parts);
  }
};

module.exports = InheritanceSpecifier;
