import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ArrayValues } from './ArrayValues.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group } = doc.builders;

export class ArrayExpression implements SlangNode {
  readonly kind = NonterminalKind.ArrayExpression;

  comments;

  loc;

  items: ArrayValues;

  constructor(ast: ast.ArrayExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.items = new ArrayValues(ast.items, options);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ArrayExpression>, print: PrintFunction): Doc {
    return group(['[', path.call(print, 'items'), ']']);
  }
}
