import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { FallbackFunctionAttribute } from './FallbackFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

const { line } = doc.builders;

export class FallbackFunctionAttributes implements SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionAttributes;

  comments;

  loc;

  items: FallbackFunctionAttribute[];

  constructor(
    ast: ast.FallbackFunctionAttributes,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) =>
        new FallbackFunctionAttribute(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<FallbackFunctionAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
