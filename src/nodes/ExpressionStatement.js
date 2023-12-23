import { doc } from 'prettier';
import { printComments } from '../common/printer-helpers.ts';

const { hardline } = doc.builders;

export const ExpressionStatement = {
  print: ({ node, options, path, print }) => {
    const comments =
      path.getParentNode().type === 'IfStatement'
        ? printComments(node, path, options)
        : [];

    return [
      comments.length ? [comments, hardline] : '',
      path.call(print, 'expression'),
      node.omitSemicolon ? '' : ';'
    ];
  }
};
