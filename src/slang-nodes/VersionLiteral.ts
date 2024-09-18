import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { SimpleVersionLiteral } from './SimpleVersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class VersionLiteral implements SlangNode {
  readonly kind = NonterminalKind.VersionLiteral;

  comments;

  loc;

  variant: SimpleVersionLiteral | string;

  constructor(ast: ast.VersionLiteral, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.text
        : new SimpleVersionLiteral(ast.variant, offsets[0]);

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VersionLiteral>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
