import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class PostfixExpression implements SlangNode {
  readonly kind = NonterminalKind.PostfixExpression;

  comments;

  loc;

  operand: Expression;

  operator: string;

  constructor(ast: ast.PostfixExpression, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.operand = new Expression(ast.operand, options);
    this.operator = ast.operator.unparse();

    updateMetadata(this.loc, this.comments, [this.operand]);
  }

  print(path: AstPath<PostfixExpression>, print: PrintFunction): Doc {
    return [path.call(print, 'operand'), this.operator];
  }
}
