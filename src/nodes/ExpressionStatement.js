import { doc } from 'prettier';
import { printComments } from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const ExpressionStatement = {
  print: ({ node, options, path, print }) => {
    const parts = [];

    const parent = path.getParentNode();

    if (parent.type === 'IfStatement') {
      if (node.comments?.length) {
        const comments = printComments(node, path, options);
        if (comments?.length) {
          parts.push(comments);
          parts.push(hardline);
        }
      }
    }

    parts.push(path.call(print, 'expression'));
    parts.push(node.omitSemicolon ? '' : ';');

    return parts;
  }
};
