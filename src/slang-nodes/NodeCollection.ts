import { SlangNode } from './SlangNode.js';

import type { CollectedMetadata, SlangCollectionNode } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export abstract class NodeCollection<
  A extends SlangCollectionNode,
  I extends PrintableNode
> extends SlangNode {
  items: I[];

  protected constructor(
    ast: A,
    collected: CollectedMetadata,
    constructor: new (
      ast: A['items'][number],
      collected: CollectedMetadata
    ) => I,
    enclosePeripheralComments = true
  ) {
    super(ast, collected, enclosePeripheralComments);

    this.items = ast.items.map((item) => new constructor(item, collected));
  }
}
