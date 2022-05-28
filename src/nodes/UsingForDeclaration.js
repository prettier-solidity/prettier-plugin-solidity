const {
  doc: {
    builders: { line, softline }
  }
} = require('prettier');

const printSeparatedList = require('./print-separated-list');

const UsingForDeclaration = {
  print: ({ node, path, print, options }) => [
    'using ',
    node.functions && node.functions.length
      ? [
          '{',
          printSeparatedList(node.functions, {
            firstSeparator: options.bracketSpacing ? line : softline
          }),
          '}'
        ]
      : node.libraryName,
    ' for ',
    node.typeName ? path.call(print, 'typeName') : '*',
    node.isGlobal ? ' global;' : ';'
  ]
};

module.exports = UsingForDeclaration;
