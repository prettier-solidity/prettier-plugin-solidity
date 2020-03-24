const {
  doc: {
    builders: { join, line }
  }
} = require('prettier');

const printComments = (node, path, options) =>
  node.comments
    ? join(
        line,
        path
          .map((commentPath) => {
            const comment = commentPath.getValue();
            if (comment.trailing || comment.leading) {
              return null;
            }
            comment.printed = true;
            return options.printer.printComment(commentPath);
          }, 'comments')
          .filter((element) => element)
      )
    : '';

module.exports = printComments;
