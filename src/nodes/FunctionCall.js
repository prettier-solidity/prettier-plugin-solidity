const {
  doc: {
    builders: { concat, group, line, softline }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const printObject = (node, path, print, options) =>
  group(
    concat([
      '{',
      printList(
        path
          .map(print, 'arguments')
          .map((arg, index) => concat([node.names[index], ': ', arg])),
        { firstSeparator: options.bracketSpacing ? line : softline }
      ),
      '}'
    ])
  );

const printArguments = (node, path, print, options) => {
  if (node.names && node.names.length > 0) {
    return printObject(node, path, print, options);
  }
  if (node.arguments && node.arguments.length > 0) {
    return printList(path.map(print, 'arguments'));
  }
  return '';
};

const FunctionCall = {
  print: ({ node, path, print, options }) =>
    concat([
      path.call(print, 'expression'),
      '(',
      printArguments(node, path, print, options),
      ')'
    ])
};

module.exports = FunctionCall;
