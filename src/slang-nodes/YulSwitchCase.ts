import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class YulSwitchCase extends PolymorphicNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  variant: YulDefaultCase | YulValueCase;

  constructor(ast: ast.YulSwitchCase, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.YulDefaultCase:
        this.variant = new YulDefaultCase(
          variant as ast.YulDefaultCase,
          options
        );
        break;
      case NonterminalKind.YulValueCase:
        this.variant = new YulValueCase(variant as ast.YulValueCase, options);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }
}
