const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier');

const modifierArguments = (node, path, print, options) => {
  if (node.arguments && node.arguments.length > 0) {
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
  // TODO: remove Capital letter Hack once solidity-parser-antlr fixes this
  if (
    path.getParentNode().isConstructor && // if we are in a Constructor.
    node.name[0] !== node.name[0].toLowerCase() // Modifier starts with a Capital letter.
  ) {
    return '()';
  }
  return '';
};

const ModifierInvocation = {
  print: ({ node, path, print, options }) =>
    concat([node.name, modifierArguments(node, path, print, options)])
};

module.exports = ModifierInvocation;
