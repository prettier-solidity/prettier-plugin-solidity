import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  slangAst.MappingKeyType,
  MappingKeyType
>(
  [[slangAst.IdentifierPath, IdentifierPath]],
  [[slangAst.ElementaryType, ElementaryType]]
);

export class MappingKeyType extends SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  variant: ElementaryType['variant'] | IdentifierPath;

  constructor(ast: slangAst.MappingKeyType, collected: CollectedMetadata) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of
      // `MappingKeyType` in the `createNonterminalVariant` function above.
      ((variant: slangAst.MappingKeyType['variant']): void => {
        if (variant instanceof slangAst.IdentifierPath) return;
        if (variant instanceof slangAst.ElementaryType) return;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
