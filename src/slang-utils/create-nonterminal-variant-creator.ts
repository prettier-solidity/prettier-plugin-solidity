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
  keys: { name: string }[],
  constructors: ConstructorsFromInstances<T['variant']>[],
  keysWithVariants?: { name: string }[],
  constructorsWithVariants?: ConstructorsFromInstances<StrictPolymorphicNode>[]
) {
  const variantConstructors = new Map<string, (typeof constructors)[number]>(
    keys.map((key, index) => [key.name, constructors[index]])
  );

  if (
    keysWithVariants === undefined ||
    constructorsWithVariants === undefined
  ) {
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

  const variantWithVariantsConstructors = new Map<
    string,
    (typeof constructorsWithVariants)[number]
  >(
    keysWithVariants.map((key, index) => [
      key.name,
      constructorsWithVariants[index]
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
