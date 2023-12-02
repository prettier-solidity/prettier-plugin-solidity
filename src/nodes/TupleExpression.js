import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { group } = doc.builders;

const contents = (node, path, print) =>
  node.components &&
  node.components.length === 1 &&
  node.components[0].type === 'BinaryOperation'
    ? path.map(print, 'components')
    : printSeparatedList(path.map(print, 'components'));

export const TupleExpression = {
  print: ({ node, path, print }) => {
    const [openingBracket, closingBracket] = node.isArray ? '[]' : '()';

    return group([openingBracket, contents(node, path, print), closingBracket]);
  }
};
