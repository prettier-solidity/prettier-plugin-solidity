import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type { CollectedMetadata } from '../types.d.ts';

const keys = [ast.IdentifierPath];
const constructors = [IdentifierPath];

const variantConstructors = new Map<string, (typeof constructors)[number]>(
  keys.map((key, index) => [key.name, constructors[index]])
);

const keysWithVariants = [ast.ElementaryType];
const constructorsWithVariants = [ElementaryType];

const variantWithVariantsConstructors = new Map<
  string,
  (typeof constructorsWithVariants)[number]
>(
  keysWithVariants.map((key, index) => [
    key.name,
    constructorsWithVariants[index]
  ])
);

function createNonterminalVariant(
  variant: ast.MappingKeyType['variant'],
  collected: CollectedMetadata
): MappingKeyType['variant'] {
  const variantConstructor = variantConstructors.get(variant.constructor.name);
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected);

  const variantWithVariantsConstructor = variantWithVariantsConstructors.get(
    variant.constructor.name
  );
  if (variantWithVariantsConstructor !== undefined)
    return extractVariant(
      new variantWithVariantsConstructor(variant as never, collected)
    );

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
}

export class MappingKeyType extends SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  variant: ElementaryType['variant'] | IdentifierPath;

  constructor(ast: ast.MappingKeyType, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
