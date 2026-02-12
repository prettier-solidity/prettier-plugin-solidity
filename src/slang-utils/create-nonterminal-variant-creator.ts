/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractVariant } from './extract-variant.js';

import type { ParserOptions } from 'prettier';
import type { AstNode, StrictPolymorphicNode } from '../slang-nodes/types.d.ts';
import type { CollectedMetadata, SlangAstNode } from '../types.d.ts';

type Constructor<T = StrictPolymorphicNode> = new (...args: any) => T;
type ConstructorsFromInstances<U> = U extends any ? Constructor<U> : never;

export function createNonterminalVariantCreator<
  T extends StrictPolymorphicNode,
  U extends Extract<SlangAstNode, { variant: unknown }>
>(
  constructors: [{ name: string }, ConstructorsFromInstances<T['variant']>][],
  constructorsWithVariants?: [
    { name: string },
    ConstructorsFromInstances<StrictPolymorphicNode>
  ][]
) {
  const variantConstructors = new Map(
    constructors.map(([key, constructor]) => [key.name, constructor])
  );

  if (constructorsWithVariants === undefined) {
    return (
      variant: U['variant'],
      collected: CollectedMetadata,
      options?: ParserOptions<AstNode>
    ): T['variant'] => {
      const constructor = variantConstructors.get(variant.constructor.name);
      if (constructor !== undefined)
        return new constructor(variant, collected, options);

      throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
    };
  }

  const variantWithVariantsConstructors = new Map(
    constructorsWithVariants.map(([key, constructor]) => [
      key.name,
      constructor
    ])
  );

  return (
    variant: U['variant'] | StrictPolymorphicNode,
    collected: CollectedMetadata,
    options?: ParserOptions<AstNode>
  ): T['variant'] => {
    let constructor:
      | ConstructorsFromInstances<T['variant'] | StrictPolymorphicNode>
      | undefined = variantConstructors.get(variant.constructor.name);
    if (constructor !== undefined)
      return new constructor(variant, collected, options);

    constructor = variantWithVariantsConstructors.get(variant.constructor.name);
    if (constructor !== undefined)
      return extractVariant(new constructor(variant, collected, options));

    throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
  };
}
