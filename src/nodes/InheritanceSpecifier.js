const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const printArguments = (node, path, print) => {
  if (node.arguments && node.arguments.length) {
    return group(
      concat([
        '(',
        indent(
          concat([
            softline,
            join(concat([',', line]), path.map(print, 'arguments'))
          ])
        ),
        softline,
        ')'
      ])
    );
  }

  return '';
};

const InheritanceSpecifier = {
  print: ({ node, path, print }) =>
    concat([path.call(print, 'baseName'), printArguments(node, path, print)])
};

module.exports = InheritanceSpecifier;
