import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ArrayValues } from './ArrayValues.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group } = doc.builders;

export class ArrayExpression implements SlangNode {
  readonly kind = NonterminalKind.ArrayExpression;

  comments;

  loc;

  items: ArrayValues;

  constructor(ast: ast.ArrayExpression) {
    let metadata = getNodeMetadata(ast);

    this.items = new ArrayValues(ast.items);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ArrayExpression>, print: PrintFunction): Doc {
    return group(['[', path.call(print, 'items'), ']']);
  }
}
