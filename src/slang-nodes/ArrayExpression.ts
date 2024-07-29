import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { ArrayValues } from './ArrayValues.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const { group } = doc.builders;

export class ArrayExpression implements SlangNode {
  readonly kind = NonterminalKind.ArrayExpression;

  comments;

  loc;

  openBracket: string;

  items: ArrayValues;

  closeBracket: string;

  constructor(
    ast: ast.ArrayExpression,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openBracket = ast.openBracket.text;
    this.items = new ArrayValues(ast.items, offsets[0], options);
    this.closeBracket = ast.closeBracket.text;

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return group([
      this.openBracket,
      path.call(print, 'items'),
      this.closeBracket
    ]);
  }
}
