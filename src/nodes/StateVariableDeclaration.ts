import { doc } from 'prettier';
import type { StateVariableDeclaration as IStateVariableDeclaration } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const { group, indent, line } = doc.builders;

const initialValue = (
  node: IStateVariableDeclaration,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (!node.initialValue) {
    return '';
  }

  if (node.initialValue.type === 'TupleExpression') {
    return [' = ', path.call(print, 'initialValue')];
  }

  return group([' =', indent([line, path.call(print, 'initialValue')])]);
};

export const StateVariableDeclaration: NodePrinter<IStateVariableDeclaration> =
  {
    print: ({ node, path, print }) => [
      path.map(print, 'variables'),
      initialValue(node, path, print),
      ';'
    ]
  };
