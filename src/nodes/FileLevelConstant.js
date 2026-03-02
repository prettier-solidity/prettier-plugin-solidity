import { printAssignmentRightSide } from '../common/printer-helpers.js';

export const FileLevelConstant = {
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    ' constant ',
    node.name,
    ' =',
    printAssignmentRightSide(
      path.call(print, 'initialValue'),
      node.initialValue
    ),
    ';'
  ]
};
