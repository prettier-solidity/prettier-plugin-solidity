import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

const initialValue = (node, path, print) => {
  if (!node.initialValue) {
    return '';
  }

  if (node.initialValue.type === 'TupleExpression') {
    return [' = ', path.call(print, 'initialValue')];
  }

  return group([' =', indent([line, path.call(print, 'initialValue')])]);
};

export const StateVariableDeclaration = {
  print: ({ node, path, print }) => [
    ...path.map(print, 'variables'),
    initialValue(node, path, print),
    ';'
  ]
};
