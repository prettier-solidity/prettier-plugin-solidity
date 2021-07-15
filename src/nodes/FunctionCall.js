const {
  doc: {
    builders: { line, softline }
  }
} = require('prettier');

const printSeparatedList = require('./print-separated-list');

const printObject = (node, path, print, options) => [
  '{',
  printSeparatedList(
    path
      .map(print, 'arguments')
      .map((arg, index) => [node.names[index], ': ', arg]),
    {
      firstSeparator: options.bracketSpacing ? line : softline,
      lastSeparator: [options.bracketSpacing ? line : softline, '})']
    }
  )
];

const printArguments = (path, print) =>
  printSeparatedList(path.map(print, 'arguments'), {
    lastSeparator: [softline, ')']
  });

const FunctionCall = {
  print: ({ node, path, print, options }) => {
    let argumentsDoc = ')';
    if (node.arguments && node.arguments.length > 0) {
      if (node.names && node.names.length > 0) {
        argumentsDoc = printObject(node, path, print, options);
      } else {
        argumentsDoc = printArguments(path, print);
      }
    }

    return [path.call(print, 'expression'), '(', argumentsDoc];
  }
};

module.exports = FunctionCall;
