import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class TupleValue implements SlangNode {
  readonly kind = NonterminalKind.TupleValue;

  comments;

  loc;

  expression?: Expression;

  constructor(
    ast: ast.TupleValue,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    if (ast.expression) {
      this.expression = new Expression(ast.expression, offsets[0], options);
    }

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TupleValue>, print: PrintFunction): Doc {
    return this.expression ? path.call(print, 'expression') : '';
  }
}
