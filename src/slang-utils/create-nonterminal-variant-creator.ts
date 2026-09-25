import { extractVariant } from './extract-variant.js';

import type { StrictPolymorphicNode } from '../slang-nodes/types.d.ts';
import type {
  CollectedMetadata,
  SlangAstNode,
  SlangAstNodeClass
} from '../types.d.ts';

// A polymorphic node is a node that has a variant property.
type SlangPolymorphicNode = Extract<SlangAstNode, { variant: unknown }>;

// Filter the constructors to only include those that are variants of the
// polymorphic node.
type SlangVariantClass<U extends SlangPolymorphicNode> = Extract<
  SlangAstNodeClass,
  new (...args: never[]) => U['variant']
>;

// Pair a SlangAstNodeClass with a constructor of a SlangNode that matches that class.
// Thus creating a mapping between the Slang AST and the Slang Node classes.
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
  constructors: ConstructorEntry<SlangVariantClass<U>, T['variant']>[]
): NonterminalVariantFactory<U, T> {
  return (variant, collected) => {
    for (const [slangAstClass, constructor] of constructors) {
      if (variant instanceof slangAstClass) {
        // Casting is safe because ConstructorEntry guarantees that the
        // constructor matches the variant.
        return new (
          constructor as new (
            ast: typeof variant,
            collected: CollectedMetadata
          ) => InstanceType<typeof constructor>
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
  constructors: ConstructorEntry<SlangVariantClass<U>, T['variant']>[],
  extractVariantConstructors: ConstructorEntry<
    SlangVariantClass<U>,
    Extract<StrictPolymorphicNode, { variant: T['variant'] }>
  >[]
): NonterminalVariantFactory<U, T> {
  const simpleCreator = createNonterminalVariantSimpleCreator<U, T>(
    constructors
  );

  return (variant, collected) => {
    for (const [slangAstClass, constructor] of extractVariantConstructors) {
      if (variant instanceof slangAstClass) {
        return extractVariant(
          // Casting is safe because ConstructorEntry guarantees that the
          // constructor matches the variant.
          new (
            constructor as new (
              ast: typeof variant,
              collected: CollectedMetadata
            ) => InstanceType<typeof constructor>
          )(variant, collected)
        );
      }
    }

    return simpleCreator(variant, collected);
  };
}
