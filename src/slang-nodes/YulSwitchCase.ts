import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
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

export class YulSwitchCase extends PolymorphicNonterminalNode<
  ast.YulSwitchCase,
  YulDefaultCase | YulValueCase
> {
  readonly kind = NonterminalKind.YulSwitchCase;

  constructor(ast: ast.YulSwitchCase, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
