import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { ElementaryType } from './ElementaryType.ts';
import { IdentifierPath } from './IdentifierPath.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.MappingKeyType,
  MappingKeyType
>(
  [[ast.IdentifierPath, IdentifierPath]],
  [[ast.ElementaryType, ElementaryType]]
);

export class MappingKeyType extends SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  variant: ElementaryType['variant'] | IdentifierPath;

  constructor(ast: ast.MappingKeyType, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
