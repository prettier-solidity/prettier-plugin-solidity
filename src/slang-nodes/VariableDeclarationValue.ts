import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class VariableDeclarationValue extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationValue;

  expression: Expression['variant'];

  constructor(
    ast: ast.VariableDeclarationValue,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.expression = extractVariant(new Expression(ast.expression, options));

    this.updateMetadata(this.expression);
  }

  print(path: AstPath<VariableDeclarationValue>, print: PrintFunction): Doc {
    return [' = ', path.call(print, 'expression')];
  }
}
