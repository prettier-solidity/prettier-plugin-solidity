import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TupleValues } from './TupleValues.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class TupleExpression extends SlangNode {
  readonly kind = NonterminalKind.TupleExpression;

  items: TupleValues;

  constructor(ast: ast.TupleExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.items = new TupleValues(ast.items, options);
  }

  print(path: AstPath<TupleExpression>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'items'), ')'];
  }
}
