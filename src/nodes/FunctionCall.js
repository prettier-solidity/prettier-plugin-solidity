const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const printObject = (node, path, print, options) =>
  group(
    concat([
      '{',
      indent(
        concat([
          options.bracketSpacing ? line : softline,
          join(
            concat([',', line]),
            path
              .map(print, 'arguments')
              .map((arg, index) => concat([node.names[index], ': ', arg]))
          )
        ])
      ),
      options.bracketSpacing ? line : softline,
      '}'
    ])
  );

const printParameters = (node, path, print) =>
  group(
    concat([
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'arguments'))
        ])
      ),
      softline
    ])
  );

const printArguments = (node, path, print, options) => {
  if (node.names && node.names.length > 0) {
    return printObject(node, path, print, options);
  }
  if (node.arguments && node.arguments.length > 0) {
    return printParameters(node, path, print);
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
