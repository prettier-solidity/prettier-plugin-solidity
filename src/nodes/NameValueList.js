const {
  doc: {
    builders: { line, softline }
  }
} = require('prettier');

const { printSeparatedList } = require('../common/printer-helpers');

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
