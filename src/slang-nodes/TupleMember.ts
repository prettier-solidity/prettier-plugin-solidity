import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { TypedTupleMember } from './TypedTupleMember.js';
import { UntypedTupleMember } from './UntypedTupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class TupleMember implements SlangNode {
  readonly kind = NonterminalKind.TupleMember;

  comments;

  loc;

  variant: TypedTupleMember | UntypedTupleMember;

  constructor(ast: ast.TupleMember, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.TypedTupleMember:
        this.variant = new TypedTupleMember(
          ast.variant as ast.TypedTupleMember,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.UntypedTupleMember:
        this.variant = new UntypedTupleMember(
          ast.variant as ast.UntypedTupleMember,
          offsets[0]
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
