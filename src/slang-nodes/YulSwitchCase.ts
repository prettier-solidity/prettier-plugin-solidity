import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.YulSwitchCase,
  YulSwitchCase
>([
  [ast.YulDefaultCase, YulDefaultCase],
  [ast.YulValueCase, YulValueCase]
]);

export class YulSwitchCase extends SlangNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  variant: YulDefaultCase | YulValueCase;

  constructor(ast: ast.YulSwitchCase, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
