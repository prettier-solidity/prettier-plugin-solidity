import { printAssignmentRightSide } from '../common/printer-helpers.js';

export const assignment = {
  match: (op) =>
    [
      '=',
      '|=',
      '^=',
      '&=',
      '<<=',
      '>>=',
      '+=',
      '-=',
      '*=',
      '/=',
      '%='
    ].includes(op),
  print: (node, path, print) => [
    path.call(print, 'left'),
    ` ${node.operator}`,
    printAssignmentRightSide(path.call(print, 'right'), node.right)
  ]
};
