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
  constructors: [
    GenericFunction<U['variant']>,
    ConstructorsFromInstances<T['variant']>
  ][]
): NonterminalVariantFactory<U, T> {
  const variantConstructors = new Map(constructors);

  return (variant, collected, options?) => {
    const constructor = variantConstructors.get(variant.constructor);
    if (constructor !== undefined)
      return new constructor(variant, collected, options);

    throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
  };
}

export function createNonterminalVariantCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: [
    GenericFunction<U['variant']>,
    ConstructorsFromInstances<T['variant']>
  ][],
  extractVariantsConstructors: [
    GenericFunction<SlangPolymorphicNode>,
    ConstructorsFromInstances<StrictPolymorphicNode>
  ][]
): NonterminalVariantFactory<U, T> {
  const simpleCreator = createNonterminalVariantSimpleCreator<U, T>(
    constructors
  );
  const extractVariantsConstructor = new Map(extractVariantsConstructors);

  return (variant, collected, options?) => {
    const constructor = extractVariantsConstructor.get(variant.constructor);
    if (constructor !== undefined)
      return extractVariant(new constructor(variant, collected, options));

    return simpleCreator(variant, collected, options);
  };
}
