import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ReceiveFunctionAttribute } from './ReceiveFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { line } = doc.builders;

export class ReceiveFunctionAttributes implements SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionAttributes;

  comments;

  loc;

  items: ReceiveFunctionAttribute[];

  constructor(
    ast: ast.ReceiveFunctionAttributes,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) =>
        new ReceiveFunctionAttribute(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(
    path: AstPath<ReceiveFunctionAttributes>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
