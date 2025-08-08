import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.YulSwitchCase['variant'],
  options: ParserOptions<AstNode>
): YulSwitchCase['variant'] {
  if (variant instanceof ast.YulDefaultCase) {
    return new YulDefaultCase(variant, options);
  }
  if (variant instanceof ast.YulValueCase) {
    return new YulValueCase(variant, options);
  }
  const exhaustiveCheck: never = variant;
  return exhaustiveCheck;
}

export class YulSwitchCase extends PolymorphicNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  variant: YulDefaultCase | YulValueCase;

  constructor(ast: ast.YulSwitchCase, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
