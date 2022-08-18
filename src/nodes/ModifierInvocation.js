const printSeparatedList = require('./print-separated-list');
const printComments = require('./print-comments');

const modifierArguments = (node, path, print, options) => {
  if (node.arguments || node.comments) {
    // We always print parentheses at this stage because the parser already
    // stripped them in FunctionDefinitions that are not a constructor.
    return node.arguments && node.arguments.length > 0
      ? [
          '(',
          printSeparatedList(path.map(print, 'arguments')),
          printComments(node, path, options),

          ')'
        ]
      : ['(', printComments(node, path, options), ')'];
  }

  return '';
};

const ModifierInvocation = {
  print: ({ node, path, print, options }) => [
    node.name,
    modifierArguments(node, path, print, options)
  ]
};

module.exports = ModifierInvocation;
