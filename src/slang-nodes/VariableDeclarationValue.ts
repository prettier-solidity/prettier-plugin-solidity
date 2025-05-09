import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class VariableDeclarationValue implements SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationValue;

  comments;

  loc;

  expression: Expression;

  constructor(ast: ast.VariableDeclarationValue) {
    let metadata = getNodeMetadata(ast);

    this.expression = new Expression(ast.expression);

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VariableDeclarationValue>, print: PrintFunction): Doc {
    return [' = ', path.call(print, 'expression')];
  }
}
