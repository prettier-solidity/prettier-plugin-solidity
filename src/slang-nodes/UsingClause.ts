import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class UsingClause implements SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  comments;

  loc;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.IdentifierPath:
        this.variant = new IdentifierPath(
          ast.variant as ast.IdentifierPath,
          offsets[0]
        );
        break;
      case NonterminalKind.UsingDeconstruction:
        this.variant = new UsingDeconstruction(
          ast.variant as ast.UsingDeconstruction,
          offsets[0]
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<UsingClause>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
