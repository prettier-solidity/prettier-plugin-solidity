import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { group } = doc.builders;

const contents = (node, path, print, options) => {
  if (
    options.experimentalTernaries &&
    path.getParentNode().type === 'Conditional'
  ) {
    return printSeparatedList(path.map(print, 'components'));
  }

  return node.components &&
    node.components.length === 1 &&
    node.components[0].type === 'BinaryOperation'
    ? path.map(print, 'components')
    : printSeparatedList(path.map(print, 'components'));
};

const brackets = {
  true: '[]',
  false: '()'
};

export const TupleExpression = {
  print: ({ node, path, print, options }) => {
    const bracket = brackets[node.isArray.toString()];

    return group([
      bracket[0],
      contents(node, path, print, options),
      bracket[1]
    ]);
  }
};
