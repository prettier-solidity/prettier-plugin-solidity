import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypedTupleMember } from './TypedTupleMember.js';
import { UntypedTupleMember } from './UntypedTupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class TupleMember implements SlangNode {
  readonly kind = NonterminalKind.TupleMember;

  comments;

  loc;

  variant: TypedTupleMember | UntypedTupleMember;

  constructor(ast: ast.TupleMember, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.TypedTupleMember:
        this.variant = new TypedTupleMember(
          ast.variant as ast.TypedTupleMember,
          options
        );
        break;
      case NonterminalKind.UntypedTupleMember:
        this.variant = new UntypedTupleMember(
          ast.variant as ast.UntypedTupleMember
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TupleMember>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
