import { doc } from 'prettier';
import {
  printComments,
  printSeparatedItem
} from '../common/printer-helpers.ts';

const { group, hardline, indent, line } = doc.builders;

const printTrueBody = (trueBodyNode, path, print) =>
  trueBodyNode.type === 'Block'
    ? [' ', path.call(print, 'trueBody')]
    : group(indent([line, path.call(print, 'trueBody')]), {
        shouldBreak: trueBodyNode.type === 'IfStatement' // `if` within `if`
      });

const printFalseBody = (falseBodyNode, path, print) =>
  falseBodyNode.type === 'Block' || falseBodyNode.type === 'IfStatement'
    ? [' ', path.call(print, 'falseBody')]
    : group(indent([line, path.call(print, 'falseBody')]));

const printElse = (node, path, print, options) => {
  if (node.falseBody) {
    const comments = printComments(node, path, options);
    return [
      comments.length ? [hardline, comments] : '',
      node.trueBody.type !== 'Block' || comments.length > 0
        ? hardline // `else` on new line
        : ' ',
      'else',
      printFalseBody(node.falseBody, path, print)
    ];
  }
  return '';
};

export const IfStatement = {
  print: ({ node, options, path, print }) => [
    'if (',
    printSeparatedItem(path.call(print, 'condition')),
    ')',
    printTrueBody(node.trueBody, path, print),
    printElse(node, path, print, options)
  ]
};
