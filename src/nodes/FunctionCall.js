const {
  doc: {
    builders: { group, line, softline }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const printObject = (node, path, print, options) =>
  group([
    '{',
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((arg, index) => [node.names[index], ': ', arg]),
      { firstSeparator: options.bracketSpacing ? line : softline }
    ),
    '}'
  ]);

const printArguments = (node, path, print, options) => {
  if (node.names && node.names.length > 0) {
    return printObject(node, path, print, options);
  }
  if (node.arguments && node.arguments.length > 0) {
    return printSeparatedList(path.map(print, 'arguments'));
  }
  return '';
};

const FunctionCall = {
  print: ({ node, path, print, options }) => [
    path.call(print, 'expression'),
    '(',
    printArguments(node, path, print, options),
    ')'
  ]
};

module.exports = FunctionCall;
