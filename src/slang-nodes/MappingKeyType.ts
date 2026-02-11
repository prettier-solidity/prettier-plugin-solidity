import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type { CollectedMetadata } from '../types.d.ts';

const variantConstructors = {
  [ast.IdentifierPath.name]: IdentifierPath
};

const variantWithVariantsConstructors = {
  [ast.ElementaryType.name]: ElementaryType
};

function createNonterminalVariant(
  variant: ast.MappingKeyType['variant'],
  collected: CollectedMetadata
): MappingKeyType['variant'] {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected);

  const variantWithVariantsConstructor =
    variantWithVariantsConstructors[variant.constructor.name];
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
