const {
  doc: {
    builders: { concat, join, line }
  }
} = require('prettier');

const printComments = (node, path, options) => {
  const parts = [];
  if (node.comments) {
    let first = true;
    path.each(commentPath => {
      const comment = commentPath.getValue();
      if (comment.trailing || comment.leading) {
        return;
      }

      if (first) {
        first = false;
      } else {
        parts.push(line);
      }

      comment.printed = true;
      parts.push(options.printer.printComment(commentPath, options));
    }, 'comments');
  }
  return concat(parts);
};

const printCommentsNew = (node, path, options) =>
  node.comments
    ? join(
        line,
        path
          .map(commentPath => {
            const comment = commentPath.getValue();
            if (comment.trailing || comment.leading) {
              return null;
            }
            comment.printed = true;
            return options.printer.printComment(commentPath);
          }, 'comments')
          .filter(element => element)
      )
    : '';

module.exports = printComments;
