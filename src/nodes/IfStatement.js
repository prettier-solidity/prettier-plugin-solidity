import { doc } from 'prettier';
import {
  printComments,
  printSeparatedItem
} from '../common/printer-helpers.js';

const { group, hardline, indent, line } = doc.builders;

const printTrueBody = (node, path, print) => {
  if (node.trueBody.type === 'Block') {
    return [' ', path.call(print, 'trueBody')];
  }

  const ifWithinIf = node.trueBody.type === 'IfStatement';
  return group(
    indent([ifWithinIf ? hardline : line, path.call(print, 'trueBody')])
  );
};

const printFalseBody = (node, path, print) =>
  node.falseBody.type === 'Block' || node.falseBody.type === 'IfStatement'
    ? [' ', path.call(print, 'falseBody')]
    : group(indent([line, path.call(print, 'falseBody')]));

const printElse = (node, path, print, commentsBetweenIfAndElse) => {
  if (node.falseBody) {
    const elseOnSameLine =
      node.trueBody.type === 'Block' && commentsBetweenIfAndElse.length === 0;
    return [
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node, path, print)
    ];
  }
  return '';
};

export const IfStatement = {
  print: ({ node, options, path, print }) => {
    const comments = node.comments || [];
    const commentsBetweenIfAndElse = comments.filter(
      (comment) => !comment.leading && !comment.trailing
    );

    const parts = [];

    parts.push('if (', printSeparatedItem(path.call(print, 'condition')), ')');
    parts.push(printTrueBody(node, path, print));
    if (commentsBetweenIfAndElse.length && node.falseBody) {
      parts.push(hardline);
      parts.push(printComments(node, path, options));
    }
    parts.push(printElse(node, path, print, commentsBetweenIfAndElse));

    return parts;
  }
};
