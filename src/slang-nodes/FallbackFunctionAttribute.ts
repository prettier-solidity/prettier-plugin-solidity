import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class FallbackFunctionAttribute implements SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionAttribute;

  comments;

  loc;

  variant: ModifierInvocation | OverrideSpecifier | string;

  constructor(
    ast: ast.FallbackFunctionAttribute,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.text;
    } else {
      switch (ast.variant.cst.kind) {
        case NonterminalKind.ModifierInvocation:
          this.variant = new ModifierInvocation(
            ast.variant as ast.ModifierInvocation,
            offsets[0],
            options
          );
          break;
        case NonterminalKind.OverrideSpecifier:
          this.variant = new OverrideSpecifier(
            ast.variant as ast.OverrideSpecifier,
            offsets[0]
          );
          break;
        default:
          throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
      }
    }

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<FallbackFunctionAttribute>,
    print: (path: AstPath<AstNode | string>) => Doc
  ): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}