import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { group, indentIfBreak } = doc.builders;

const embraceVariables = (document, embrace) =>
  embrace ? ['(', printSeparatedList(document), ')'] : document;

const initialValue = (node, path, print) =>
  node.initialValue ? [' = ', path.call(print, 'initialValue')] : '';

let groupIndex = 0;
export const VariableDeclarationStatement = {
  print: ({ node, path, print }) => {
    const startsWithVar =
      node.variables.filter((x) => x?.typeName).length === 0;

    const declarationDoc = group(
      [
        startsWithVar ? 'var ' : '',
        embraceVariables(
          path.map(print, 'variables'),
          node.variables.length > 1 || startsWithVar
        )
      ],
      { id: `VariableDeclarationStatement.variables-${groupIndex}` }
    );
    groupIndex += 1;
    const initialValueDoc = initialValue(node, path, print);

    return group([
      declarationDoc,
      indentIfBreak(initialValueDoc, {
        groupId: declarationDoc.id
      }),
      node.omitSemicolon ? '' : ';'
    ]);
  }
};
