const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class VariableDeclarationValue extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationValue;

  expression: Expression;

  constructor(
    ast: ast.VariableDeclarationValue,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.expression = new Expression(ast.expression, options);

    this.updateMetadata(this.expression);
  }

  print(path: AstPath<VariableDeclarationValue>, print: PrintFunction): Doc {
    return [' = ', path.call(print, 'expression')];
  }
}
