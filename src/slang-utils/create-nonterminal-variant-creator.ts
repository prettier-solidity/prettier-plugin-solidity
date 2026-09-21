import { extractVariant } from './extract-variant.js';

import type { StrictPolymorphicNode } from '../slang-nodes/types.d.ts';
import type {
  CollectedMetadata,
  SlangAstNode,
  SlangAstNodeClass
} from '../types.d.ts';

type SlangPolymorphicNode = Extract<SlangAstNode, { variant: unknown }>;
type ConstructorEntry<
  Class extends SlangAstNodeClass,
  T
> = Class extends unknown
  ? [Class, new (ast: InstanceType<Class>, collected: CollectedMetadata) => T]
  : never;

type NonterminalVariantFactory<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
> = (variant: U['variant'], collected: CollectedMetadata) => T['variant'];

export function createNonterminalVariantSimpleCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: ConstructorEntry<SlangAstNodeClass, T['variant']>[]
): NonterminalVariantFactory<U, T> {
  return (variant, collected) => {
    for (const [slangAstClass, constructor] of constructors) {
      if (variant instanceof slangAstClass) {
        return new (
          constructor as new (
            ast: typeof variant,
            collected: CollectedMetadata
          ) => T['variant']
        )(variant, collected);
      }
    }

    throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
  };
}

export function createNonterminalVariantCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: ConstructorEntry<SlangAstNodeClass, T['variant']>[],
  extractVariantConstructors: ConstructorEntry<
    SlangAstNodeClass,
    StrictPolymorphicNode
  >[]
): NonterminalVariantFactory<U, T> {
  const simpleCreator = createNonterminalVariantSimpleCreator<U, T>(
    constructors
  );

  return (variant, collected) => {
    for (const [slangAstClass, constructor] of extractVariantConstructors) {
      if (variant instanceof slangAstClass) {
        return extractVariant(
          new (
            constructor as new (
              ast: typeof variant,
              collected: CollectedMetadata
            ) => StrictPolymorphicNode
          )(variant, collected)
        );
      }
    }

    return simpleCreator(variant, collected);
  };
}
