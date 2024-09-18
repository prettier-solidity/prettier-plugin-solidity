import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { AddressType } from './AddressType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class ElementaryType implements SlangNode {
  readonly kind = NonterminalKind.ElementaryType;

  comments;

  loc;

  variant: AddressType | string;

  constructor(ast: ast.ElementaryType, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.text
        : new AddressType(ast.variant, offsets[0]);

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ElementaryType>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
