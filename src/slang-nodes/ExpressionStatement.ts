import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ExpressionStatement implements SlangNode {
  readonly kind = NonterminalKind.ExpressionStatement;

  comments;

  loc;

  expression: Expression;

  constructor(ast: ast.ExpressionStatement, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.expression = new Expression(ast.expression, options);

    updateMetadata(this.loc, this.comments, [this.expression]);
  }

  print(path: AstPath<ExpressionStatement>, print: PrintFunction): Doc {
    return [path.call(print, 'expression'), ';'];
  }
}
