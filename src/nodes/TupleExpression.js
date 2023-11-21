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

export const TupleExpression = {
  print: ({ node, path, print, options }) => {
    const [openingBracket, closingBracket] = node.isArray ? '[]' : '()';

    return group([
      openingBracket,
      contents(node, path, print, options),
      closingBracket
    ]);
  }
};
