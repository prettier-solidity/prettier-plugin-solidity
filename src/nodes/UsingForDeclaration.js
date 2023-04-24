const {
  doc: {
    builders: { line, softline }
  }
} = require('prettier');

const { printSeparatedList } = require('../common/printer-helpers');

const UsingForDeclaration = {
  print: ({ node, path, print, options }) => [
    'using ',
    node.functions && node.functions.length
      ? [
          '{',
          printSeparatedList(
            node.functions.map((functionName, i) =>
              node.operators[i]
                ? [functionName, ' as ', node.operators[i]]
                : functionName
            ),
            {
              firstSeparator: options.bracketSpacing ? line : softline
            }
          ),
          '}'
        ]
      : node.libraryName,
    ' for ',
    node.typeName ? path.call(print, 'typeName') : '*',
    node.isGlobal ? ' global;' : ';'
  ]
};

module.exports = UsingForDeclaration;
