import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type {
  VariableDeclaration,
  VariableDeclarationStatement as IVariableDeclarationStatement
} from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const { group, indentIfBreak } = doc.builders;

const embraceVariables = (document: Doc[], embrace: boolean): Doc =>
  embrace ? ['(', printSeparatedList(document), ')'] : document;

const initialValue = (
  node: IVariableDeclarationStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => (node.initialValue ? [' = ', path.call(print, 'initialValue')] : '');

let groupIndex = 0;
export const VariableDeclarationStatement: NodePrinter<IVariableDeclarationStatement> =
  {
    print: ({ node, path, print }) => {
      const startsWithVar =
        node.variables.filter(
          (x) => (x as VariableDeclaration | null)?.typeName
        ).length === 0;

      const declarationDoc = group(
        [
          startsWithVar ? 'var ' : '',
          embraceVariables(
            path.map(print, 'variables'),
            node.variables.length > 1 || startsWithVar
          )
        ],
        { id: Symbol(`VariableDeclarationStatement.variables-${groupIndex}`) }
      );
      groupIndex += 1;
      const initialValueDoc = initialValue(node, path, print);

      return group([
        declarationDoc,
        indentIfBreak(initialValueDoc, { groupId: declarationDoc.id! }),
        node.omitSemicolon ? '' : ';'
      ]);
    }
  };
