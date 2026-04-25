/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractVariant } from './extract-variant.js';

import type { StrictPolymorphicNode } from '../slang-nodes/types.d.ts';
import type {
  CollectedMetadata,
  SlangAstNodeClass,
  SlangPolymorphicNode
} from '../types.d.ts';

type NodeConstructor<T> = new (ast: any, collected: CollectedMetadata) => T;

type NonterminalVariantFactory<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
> = (variant: U['variant'], collected: CollectedMetadata) => T['variant'];

export function createNonterminalVariantSimpleCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: [SlangAstNodeClass, NodeConstructor<T['variant']>][]
): NonterminalVariantFactory<U, T> {
  return (variant, collected) => {
    for (const [slangAstClass, constructor] of constructors) {
      if (variant instanceof slangAstClass)
        return new constructor(variant, collected);
    }

    throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
  };
}

export function createNonterminalVariantCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: [SlangAstNodeClass, NodeConstructor<T['variant']>][],
  extractVariantConstructors: [
    SlangAstNodeClass,
    NodeConstructor<StrictPolymorphicNode>
  ][]
): NonterminalVariantFactory<U, T> {
  const simpleCreator = createNonterminalVariantSimpleCreator<U, T>(
    constructors
  );

  return (variant, collected) => {
    for (const [slangAstClass, constructor] of extractVariantConstructors) {
      if (variant instanceof slangAstClass)
        return extractVariant(new constructor(variant, collected));
    }

    return simpleCreator(variant, collected);
  };
}
