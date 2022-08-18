const printSeparatedList = require('./print-separated-list');
const printComments = require('./print-comments');

const modifierArguments = (node, path, print, options) => {
  if (node.arguments) {
    // We always print parentheses at this stage because the parser already
    // stripped them in FunctionDefinitions that are not a constructor.
    return node.arguments.length > 0
      ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
      : '()';
  }

  if (
    node.comments &&
    node.comments.some(
      (comment) => !comment.leading && !comment.trailing && !comment.printed
    )
  ) {
    // We print parentheses here because the comment is supposed to be a block
    // comment inside empty parentheses.
    //    modifier(/* comment */)
    return ['(', printComments(node, path, options), ')'];
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
