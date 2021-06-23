const {
  doc: {
    builders: { label, line, softline }
  }
} = require('prettier');

const printSeparatedList = require('./print-separated-list');

let functionCallId = 0;

const printObject = (node, path, print, options, groupId) => [
  '{',
  printSeparatedList(
    path
      .map(print, 'arguments')
      .map((arg, index) => [node.names[index], ': ', arg]),
    {
      groupId,
      firstSeparator: options.bracketSpacing ? line : softline,
      lastSeparator: [options.bracketSpacing ? line : softline, '})']
    }
  )
];

const printArguments = (path, print, groupId) =>
  printSeparatedList(path.map(print, 'arguments'), {
    groupId,
    lastSeparator: [softline, ')']
  });

const FunctionCall = {
  print: ({ node, path, print, options }) => {
    let argumentsDoc = ')';
    const functionCallLabel = { type: 'FunctionCall', groupId: null };
    if (node.arguments && node.arguments.length > 0) {
      functionCallLabel.groupId = `FunctionCall-${functionCallId}`;
      functionCallId += 1;
      if (node.names && node.names.length > 0) {
        argumentsDoc = printObject(
          node,
          path,
          print,
          options,
          functionCallLabel.groupId
        );
      } else {
        argumentsDoc = printArguments(path, print, functionCallLabel.groupId);
      }
    }

    return label(JSON.stringify(functionCallLabel), [
      path.call(print, 'expression'),
      '(',
      argumentsDoc
    ]);
  }
};

module.exports = FunctionCall;
