import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

const { line } = doc.builders;

export class UnnamedFunctionAttributes implements SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionAttributes;

  comments;

  loc;

  items: UnnamedFunctionAttribute[];

  constructor(
    ast: ast.UnnamedFunctionAttributes,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) =>
        new UnnamedFunctionAttribute(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(
    path: AstPath<UnnamedFunctionAttributes>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
