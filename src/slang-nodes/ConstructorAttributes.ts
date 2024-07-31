import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ConstructorAttribute } from './ConstructorAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const { line } = doc.builders;

export class ConstructorAttributes implements SlangNode {
  readonly kind = NonterminalKind.ConstructorAttributes;

  comments;

  loc;

  items: ConstructorAttribute[];

  constructor(
    ast: ast.ConstructorAttributes,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new ConstructorAttribute(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
