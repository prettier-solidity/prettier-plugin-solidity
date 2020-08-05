const {
  doc: {
    builders: { concat, line }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const AssemblyLocalDefinition = {
  print: ({ node, path, print }) => {
    const parts = [
      'let',
      printSeparatedList(path.map(print, 'names'), { firstSeparator: line })
    ];

    if (node.expression !== null) {
      parts.push(':= ');
      parts.push(path.call(print, 'expression'));
    }

    return concat(parts);
  }
};

module.exports = AssemblyLocalDefinition;
