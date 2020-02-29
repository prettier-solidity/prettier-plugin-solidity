const {
  doc: {
    builders: { concat, indent, line }
  }
} = require('prettier/standalone');

const printPreservingEmptyLines = require('./print-preserving-empty-lines');
const printComments = require('./print-comments');

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
              printPreservingEmptyLines(path, 'statements', options, print),
              printComments(node, path, options)
            ])
          ),
          line,
          '}'
        ])
};

module.exports = Block;
