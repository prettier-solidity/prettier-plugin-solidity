import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.YulSwitchCase['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): YulSwitchCase['variant'] {
  if (variant instanceof ast.YulDefaultCase) {
    return new YulDefaultCase(variant, collected, options);
  }
  if (variant instanceof ast.YulValueCase) {
    return new YulValueCase(variant, collected, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class YulSwitchCase extends SlangNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  variant: YulDefaultCase | YulValueCase;

  constructor(
    ast: ast.YulSwitchCase,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
