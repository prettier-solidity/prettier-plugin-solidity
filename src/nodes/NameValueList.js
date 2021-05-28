const {
  doc: {
    builders: { line, softline }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const NameValueList = {
  print: ({ node, path, print, options }) =>
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((argument, index) => [node.names[index], ': ', argument]),
      {
        firstSeparator: options.bracketSpacing ? line : softline
      }
    )
};

module.exports = NameValueList;
