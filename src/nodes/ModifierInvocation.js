const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const modifierArguments = (node, path, print) => {
  if (node.arguments) {
    if (node.arguments.length > 0) {
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

    return '()';
  }

  return '';
};

const ModifierInvocation = {
  print: ({ node, path, print }) =>
    concat([node.name, modifierArguments(node, path, print)])
};

module.exports = ModifierInvocation;
