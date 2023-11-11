import { doc } from 'prettier';
import { printComments } from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const ExpressionStatement = {
  print: ({ node, options, path, print }) => {
    const parts = [];

    if (path.getParentNode().type === 'IfStatement') {
      const comments = printComments(node, path, options);
      if (comments.length) {
        parts.push(comments, hardline);
      }
    }

    parts.push(path.call(print, 'expression'));
    if (!node.omitSemicolon) {
      parts.push(';');
    }
    return parts;
  }
};
