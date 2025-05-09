import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ExpressionStatement implements SlangNode {
  readonly kind = NonterminalKind.ExpressionStatement;

  comments;

  loc;

  expression: Expression;

  constructor(ast: ast.ExpressionStatement) {
    let metadata = getNodeMetadata(ast);

    this.expression = new Expression(ast.expression);

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ExpressionStatement>, print: PrintFunction): Doc {
    return [path.call(print, 'expression'), ';'];
  }
}
