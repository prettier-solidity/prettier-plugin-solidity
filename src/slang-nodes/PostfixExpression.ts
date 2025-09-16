import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class PostfixExpression extends SlangNode {
  readonly kind = NonterminalKind.PostfixExpression;

  operand: Expression['variant'];

  operator: string;

  constructor(ast: ast.PostfixExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.operand = extractVariant(new Expression(ast.operand, options));
    this.operator = ast.operator.unparse();

    this.updateMetadata(this.operand);
  }

  print(path: AstPath<PostfixExpression>, print: PrintFunction): Doc {
    return [path.call(print, 'operand'), this.operator];
  }
}
