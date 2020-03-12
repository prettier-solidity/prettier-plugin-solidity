const {
  doc: {
    builders: { concat, indent, line }
  }
} = require('prettier/standalone');

const printPreservingEmptyLines = require('./print-preserving-empty-lines');
const printComments = require('./print-comments');

const comments = (node, path, options) =>
  node.comments &&
  // Trailing and leading comments are printed correctly by prettier.
  node.comments.filter(comment => !comment.trailing && !comment.leading).length
    ? concat([
        printComments(node, path, options),
        node.statements.length > 0 ? line : '' // separate with a line if statements follow
      ])
    : '';

const Block = {
  print: ({ node, options, path, print }) =>
    // if block is empty, just return the pair of braces
    node.statements.length === 0 && !node.comments
      ? '{}'
      : concat([
          '{',
          indent(
            concat([
              line,
              comments(node, path, options),
              printPreservingEmptyLines(path, 'statements', options, print)
            ])
          ),
          line,
          '}'
        ])
};

module.exports = Block;
