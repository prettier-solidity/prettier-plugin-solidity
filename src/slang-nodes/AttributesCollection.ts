import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { VariantCollection } from './VariantCollection.js';
import { TerminalNode } from './TerminalNode.js';

import type { AstPath, Doc } from 'prettier';
import type {
  CollectedMetadata,
  PrintFunction,
  SlangVariantCollection
} from '../types.d.ts';
import type { SortableAttribute } from './types.d.ts';

const { line } = doc.builders;

const visibilityKeyWords = new Set([
  'external',
  'internal',
  'public',
  'private'
]);

const mutabilityKeyWords = new Set(['pure', 'constant', 'payable', 'view']);

function sortFunctionAttributes(
  aVariant: SortableAttribute['variant'],
  bVariant: SortableAttribute['variant']
): number {
  const aIsString = aVariant instanceof TerminalNode;
  const bIsString = bVariant instanceof TerminalNode;

  // Both are strings
  if (aIsString && bIsString) {
    // Visibility First
    if (visibilityKeyWords.has(aVariant.value)) return -1;
    if (visibilityKeyWords.has(bVariant.value)) return 1;
    // State Mutability Second
    if (mutabilityKeyWords.has(aVariant.value)) return -1;
    if (mutabilityKeyWords.has(bVariant.value)) return 1;
    // Virtual keyword last
    return 0;
  }

  // Only one is a string
  if (aIsString) return -1;
  if (bIsString) return 1;

  // Both are nodes
  // OverrideSpecifiers before ModifierInvocation
  if (
    aVariant.kind === NonterminalKind.OverrideSpecifier &&
    bVariant.kind === NonterminalKind.ModifierInvocation
  )
    return -1;
  if (
    bVariant.kind === NonterminalKind.OverrideSpecifier &&
    aVariant.kind === NonterminalKind.ModifierInvocation
  )
    return 1;

  return 0;
}

export abstract class AttributesCollection<
  A extends SlangVariantCollection,
  I extends SortableAttribute
> extends VariantCollection<A, I> {
  protected constructor(
    ast: A,
    collected: CollectedMetadata,
    constructor: new (
      ast: A['items'][number],
      collected: CollectedMetadata
    ) => I
  ) {
    super(ast, collected, constructor);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<{ items: I['variant'][] }>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
