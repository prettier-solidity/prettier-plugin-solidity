import { doc } from 'prettier';
import {
  printAssignmentRightSide,
  printSeparatedList
} from '../common/printer-helpers.js';

const { group, indentIfBreak, line } = doc.builders;

const embraceVariables = (document, embrace) =>
  embrace ? ['(', printSeparatedList(document), ')'] : document;

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
      { id: Symbol('VariableDeclarationStatement.variables') }
    );
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
