import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.MappingKeyType,
  MappingKeyType
>(
  [[ast.IdentifierPath, IdentifierPath]],
  [[ast.ElementaryType, ElementaryType]]
);

export class MappingKeyType extends PolymorphicNonterminalNode<
  ast.MappingKeyType,
  ElementaryType['variant'] | IdentifierPath
> {
  readonly kind = NonterminalKind.MappingKeyType;

  constructor(ast: ast.MappingKeyType, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
