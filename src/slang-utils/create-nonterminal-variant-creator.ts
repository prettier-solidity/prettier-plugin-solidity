/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractVariant } from './extract-variant.js';

import type { ParserOptions } from 'prettier';
import type { AstNode, StrictPolymorphicNode } from '../slang-nodes/types.d.ts';
import type { CollectedMetadata, SlangAstNode } from '../types.d.ts';

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
  constructors: Record<string, ConstructorsFromInstances<T['variant']>>
): NonterminalVariantFactory<U, T> {
  return (variant, collected, options?) => {
    const constructor = constructors[variant.constructor.name];
    if (constructor !== undefined)
      return new constructor(variant, collected, options);

    throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
  };
}

export function createNonterminalVariantCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: Record<string, ConstructorsFromInstances<T['variant']>>,
  extractVariantConstructors: Record<
    string,
    ConstructorsFromInstances<StrictPolymorphicNode>
  >
): NonterminalVariantFactory<U, T> {
  const simpleCreator = createNonterminalVariantSimpleCreator<U, T>(
    constructors
  );

  return (variant, collected, options?) => {
    const constructor = extractVariantConstructors[variant.constructor.name];
    if (constructor !== undefined)
      return extractVariant(new constructor(variant, collected, options));

    return simpleCreator(variant, collected, options);
  };
}
