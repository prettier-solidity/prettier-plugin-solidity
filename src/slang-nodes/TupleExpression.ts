import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleValues } from './TupleValues.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class TupleExpression implements SlangNode {
  readonly kind = NonterminalKind.TupleExpression;

  comments;

  loc;

  items: TupleValues;

  constructor(ast: ast.TupleExpression, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    this.items = new TupleValues(ast.items, options);

    [this.loc, this.comments] = updateMetadata(metadata, [this.items]);
  }

  print(path: AstPath<TupleExpression>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'items'), ')'];
  }
}
