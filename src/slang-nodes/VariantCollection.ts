import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';

import type { CollectedMetadata, SlangVariantCollection } from '../types.d.ts';
import type { StrictPolymorphicNode } from './types.d.ts';

export abstract class VariantCollection<
  A extends SlangVariantCollection,
  I extends StrictPolymorphicNode
> extends SlangNode {
  items: I['variant'][];

  protected constructor(
    ast: A,
    collected: CollectedMetadata,
    constructor: new (
      ast: A['items'][number],
      collected: CollectedMetadata
    ) => I
  ) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new constructor(item, collected))
    );
  }
}
