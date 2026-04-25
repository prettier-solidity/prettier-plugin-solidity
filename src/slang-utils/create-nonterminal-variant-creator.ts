/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractVariant } from './extract-variant.js';

import type {
  NodeInitializationAttributes,
  StrictPolymorphicNode
} from '../slang-nodes/types.d.ts';
import type {
  CollectedMetadata,
  SlangAstNodeClass,
  SlangPolymorphicNode
} from '../types.d.ts';

type NodeConstructor<T> = new (
  ast: any,
  collected: CollectedMetadata,
  initializationAttributes?: NodeInitializationAttributes
) => T;

type NonterminalVariantFactory<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
> = (
  variant: U['variant'],
  collected: CollectedMetadata,
  initializationAttributes?: NodeInitializationAttributes
) => T['variant'];

export function createNonterminalVariantSimpleCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: [SlangAstNodeClass, NodeConstructor<T['variant']>][]
): NonterminalVariantFactory<U, T> {
  return (variant, collected, initializationAttributes) => {
    for (const [slangAstClass, constructor] of constructors) {
      if (variant instanceof slangAstClass)
        return new constructor(variant, collected, initializationAttributes);
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

  return (variant, collected, initializationAttributes) => {
    for (const [slangAstClass, constructor] of extractVariantConstructors) {
      if (variant instanceof slangAstClass)
        return extractVariant(
          new constructor(variant, collected, initializationAttributes)
        );
    }

    return simpleCreator(variant, collected, initializationAttributes);
  };
}
