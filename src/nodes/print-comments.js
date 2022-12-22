const {
  doc: {
    builders: { join, line }
  }
} = require('prettier');
const { prettierVersionSatisfies } = require('../common/util');

const printComments = (node, path, options, filter = () => true) => {
  if (!node.comments) return '';
  const doc = join(
    line,
    path
      .map((commentPath) => {
        const comment = commentPath.getValue();
        if (comment.trailing || comment.leading || comment.printed) {
          return null;
        }
        if (!filter(comment)) {
          return null;
        }
        comment.printed = true;
        return options.printer.printComment(commentPath);
      }, 'comments')
      .filter(Boolean)
  );

  // The following if statement will never be 100% covered in a single run
  // since it depends on the version of Prettier being used.
  // Mocking the behaviour will introduce a lot of maintenance in the tests.
  /* c8 ignore start */
  return prettierVersionSatisfies('^2.3.0')
    ? doc.parts // Prettier V2
    : doc; // Prettier V3
  /* c8 ignore stop */
};

module.exports = printComments;
