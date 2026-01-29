import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class TupleValue extends SlangNode {
  readonly kind = NonterminalKind.TupleValue;

  expression?: Expression['variant'];

  constructor(
    ast: ast.TupleValue,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (ast.expression) {
      this.expression = extractVariant(
        new Expression(ast.expression, collected, options)
      );
    }

    this.updateMetadata(this.expression);
  }

  print(path: AstPath<TupleValue>, print: PrintFunction): Doc {
    return path.call(print, 'expression');
  }
}
