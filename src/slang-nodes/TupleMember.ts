import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TypedTupleMember } from './TypedTupleMember.js';
import { UntypedTupleMember } from './UntypedTupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class TupleMember extends SlangNode {
  readonly kind = NonterminalKind.TupleMember;

  variant: TypedTupleMember | UntypedTupleMember;

  constructor(ast: ast.TupleMember, options: ParserOptions<AstNode>) {
    super(ast);

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

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<TupleMember>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
