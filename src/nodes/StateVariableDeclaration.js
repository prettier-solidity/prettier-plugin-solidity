import { printAssignmentRightSide } from '../common/printer-helpers.js';

const initialValue = (node, path, print) => {
  if (!node.initialValue) {
    return '';
  }

  return [
    ' =',
    printAssignmentRightSide(
      path.call(print, 'initialValue'),
      node.initialValue
    )
  ];
};

export const StateVariableDeclaration = {
  print: ({ node, path, print }) => [
    ...path.map(print, 'variables'),
    initialValue(node, path, print),
    ';'
  ]
};
