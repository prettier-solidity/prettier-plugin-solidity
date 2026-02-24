import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.UsingClause,
  UsingClause
>([
  [slangAst.IdentifierPath, IdentifierPath],
  [slangAst.UsingDeconstruction, UsingDeconstruction]
]);

export class UsingClause extends SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: slangAst.UsingClause, collected: CollectedMetadata) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of `UsingClause`
      // in the `createNonterminalVariant` function above.
      ((variant: slangAst.UsingClause['variant']): void => {
        if (variant instanceof slangAst.IdentifierPath) return;
        if (variant instanceof slangAst.UsingDeconstruction) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
