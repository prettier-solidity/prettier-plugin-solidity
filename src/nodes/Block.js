const {
  doc: {
    builders: { concat, indent, line }
  }
} = require('prettier/standalone');

const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const Block = {
  print: ({ node, options, path, print }) => {
    // if block is empty, just return the pair of braces
    if (node.statements.length === 0 && !node.comments) {
      return '{}';
    }

    const parts = [
      '{',
      indent(line),
      indent(printPreservingEmptyLines(path, 'statements', options, print))
    ];

    if (node.comments) {
      let first = true;
      path.each(commentPath => {
        if (first) {
          first = false;
        } else {
          parts.push(indent(line));
        }
        const comment = commentPath.getValue();
        if (comment.trailing || comment.leading) {
          return;
        }
        comment.printed = true;
        parts.push(options.printer.printComment(commentPath));
      }, 'comments');
    }

    parts.push(line);
    parts.push('}');

    return concat(parts);
  }
};

module.exports = Block;
