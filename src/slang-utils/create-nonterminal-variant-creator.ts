/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractVariant } from './extract-variant.js';

import type { ParserOptions } from 'prettier';
import type { AstNode, StrictPolymorphicNode } from '../slang-nodes/types.d.ts';
import type {
  CollectedMetadata,
  SlangAstNode,
  SlangAstNodeClass
} from '../types.d.ts';

type Constructor<T> = new (...args: any) => T;
type ConstructorsFromInstances<U> = U extends any ? Constructor<U> : never;
type SlangPolymorphicNode = Extract<SlangAstNode, { variant: unknown }>;

type NonterminalVariantFactory<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
> = (
  variant: U['variant'],
  collected: CollectedMetadata,
  options?: ParserOptions<AstNode>
) => T['variant'];

export function createNonterminalVariantSimpleCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: [SlangAstNodeClass, ConstructorsFromInstances<T['variant']>][]
): NonterminalVariantFactory<U, T> {
  const variantConstructors = new Map(constructors);

  return (variant, collected, options?) => {
    const constructor = variantConstructors.get(
      variant.constructor as SlangAstNodeClass
    );
    if (constructor !== undefined)
      return new constructor(variant, collected, options);

    throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
  };
}

export function createNonterminalVariantCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: [SlangAstNodeClass, ConstructorsFromInstances<T['variant']>][],
  extractVariantConstructors: [
    SlangAstNodeClass,
    ConstructorsFromInstances<StrictPolymorphicNode>
  ][]
): NonterminalVariantFactory<U, T> {
  const variantConstructors = new Map(extractVariantConstructors);

  const simpleCreator = createNonterminalVariantSimpleCreator<U, T>(
    constructors
  );

  return (variant, collected, options?) => {
    const constructor = variantConstructors.get(
      variant.constructor as SlangAstNodeClass
    );
    if (constructor !== undefined)
      return extractVariant(new constructor(variant, collected, options));

    return simpleCreator(variant, collected, options);
  };
}
