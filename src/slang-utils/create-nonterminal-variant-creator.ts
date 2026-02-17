/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractVariant } from './extract-variant.js';

import type { ParserOptions } from 'prettier';
import type { AstNode, StrictPolymorphicNode } from '../slang-nodes/types.d.ts';
import type {
  CollectedMetadata,
  SlangAstNode,
  SlangAstNodeConstructors
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
  constructors: [
    SlangAstNodeConstructors,
    ConstructorsFromInstances<T['variant']>
  ][]
): NonterminalVariantFactory<U, T> {
  return (variant, collected, options?) => {
    for (const [instance, constructor] of constructors) {
      if (variant instanceof instance)
        return new constructor(variant, collected, options);
    }

    throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
  };
}

export function createNonterminalVariantCreator<
  U extends SlangPolymorphicNode,
  T extends StrictPolymorphicNode
>(
  constructors: [
    SlangAstNodeConstructors,
    ConstructorsFromInstances<T['variant']>
  ][],
  extractVariantConstructors: [
    SlangAstNodeConstructors,
    ConstructorsFromInstances<StrictPolymorphicNode>
  ][]
): NonterminalVariantFactory<U, T> {
  const simpleCreator = createNonterminalVariantSimpleCreator<U, T>(
    constructors
  );

  return (variant, collected, options?) => {
    for (const [instance, constructor] of extractVariantConstructors) {
      if (variant instanceof instance)
        return extractVariant(new constructor(variant, collected, options));
    }

    return simpleCreator(variant, collected, options);
  };
}
