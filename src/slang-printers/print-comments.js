import { doc } from 'prettier';
import { isPrettier2 } from '../common/backward-compatibility.js';

const { join, line } = doc.builders;

export function printComments(node, path, options, filter = () => true) {
  if (!node.comments) return [];
  const document = join(
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
        // TODO: prettier Prints leading and trailing comments anyway.
        comment.leading = false;
        comment.trailing = false;
        return options.printer.printComment(commentPath, options);
      }, 'comments')
      .filter(Boolean)
  );

  // The following if statement will never be 100% covered in a single run
  // since it depends on the version of Prettier being used.
  // Mocking the behaviour will introduce a lot of maintenance in the tests.
  /* c8 ignore start */
  return isPrettier2
    ? document.parts // Prettier V2
    : document; // Prettier V3
  /* c8 ignore stop */
}
