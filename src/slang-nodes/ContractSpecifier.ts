import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { StorageLayoutSpecifier } from './StorageLayoutSpecifier.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.ContractSpecifier,
  ContractSpecifier
>([
  [slangAst.InheritanceSpecifier, InheritanceSpecifier],
  [slangAst.StorageLayoutSpecifier, StorageLayoutSpecifier]
]);

export class ContractSpecifier extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifier;

  variant: InheritanceSpecifier | StorageLayoutSpecifier;

  constructor(
    ast: slangAst.ContractSpecifier,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of
      // `ContractSpecifier` in the `createNonterminalVariant` function above.
      ((variant: slangAst.ContractSpecifier['variant']): void => {
        if (variant instanceof slangAst.InheritanceSpecifier) return;
        if (variant instanceof slangAst.StorageLayoutSpecifier) return;
        /* c8 ignore next 2 */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
