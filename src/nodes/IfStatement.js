import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

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

const printElse = (node, path, print) => {
  if (node.falseBody) {
    const elseOnSameLine = node.trueBody.type === 'Block';
    return [
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node, path, print)
    ];
  }
  return '';
};

export const IfStatement = {
  print: ({ node, path, print }) => [
    'if (',
    printSeparatedItem(path.call(print, 'condition')),
    ')',
    printTrueBody(node, path, print),
    printElse(node, path, print)
  ]
};
