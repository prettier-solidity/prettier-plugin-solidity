const {
  doc: {
    builders: { group, dedent, indent, ifBreak, line, softline },
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

let groupIndex = 0
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

    const expression = group(path.call(print, 'expression'), { id: `expression-${groupIndex}` })
    groupIndex += 1

    return indent([
      expression,
      '(',
      ifBreak(argumentsDoc, dedent(argumentsDoc), { groupId: expression.id })
    ]);
  }
};

module.exports = FunctionCall;
