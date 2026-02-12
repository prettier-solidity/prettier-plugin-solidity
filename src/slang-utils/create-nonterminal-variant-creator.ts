/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractVariant } from './extract-variant.js';

import type { ParserOptions } from 'prettier';
import type {
  AstNode,
  StrictAstNode,
  StrictPolymorphicNode
} from '../slang-nodes/types.d.ts';
import type { CollectedMetadata, SlangAstNode } from '../types.d.ts';

type Constructor<T = StrictAstNode> = new (...args: any) => T;
type ConstructorsFromInstances<U> = U extends any ? Constructor<U> : never;
type GenericFunction<U> = U extends any
  ? { prototype: unknown; name: string }
  : never;
type SlangPolymorphicNode = Extract<SlangAstNode, { variant: unknown }>;

export function createNonterminalVariantCreator<
  T extends StrictPolymorphicNode,
  U extends SlangPolymorphicNode
>(
  constructors: [
    GenericFunction<U['variant']>,
    ConstructorsFromInstances<T['variant']>
  ][],
  constructorsWithVariants?: [
    GenericFunction<SlangPolymorphicNode>,
    ConstructorsFromInstances<StrictPolymorphicNode>
  ][]
) {
  const variantConstructors = new Map(constructors);

  if (constructorsWithVariants === undefined) {
    return (
      variant: U['variant'],
      collected: CollectedMetadata,
      options?: ParserOptions<AstNode>
    ): T['variant'] => {
      const constructor = variantConstructors.get(variant.constructor);
      if (constructor !== undefined)
        return new constructor(variant, collected, options);

      throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
    };
  }

  const variantWithVariantsConstructors = new Map(constructorsWithVariants);

  return (
    variant: U['variant'] | SlangPolymorphicNode,
    collected: CollectedMetadata,
    options?: ParserOptions<AstNode>
  ): T['variant'] => {
    let constructor:
      | ConstructorsFromInstances<T['variant'] | StrictPolymorphicNode>
      | undefined = variantConstructors.get(variant.constructor);
    if (constructor !== undefined)
      return new constructor(variant, collected, options);

    constructor = variantWithVariantsConstructors.get(variant.constructor);
    if (constructor !== undefined)
      return extractVariant(new constructor(variant, collected, options));

    throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
  };
}
