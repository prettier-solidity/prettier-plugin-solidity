import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { NodeCollection } from '../slang-nodes/types.js';

export function printVariantCollection(
  path: AstPath<NodeCollection>,
  print: PrintFunction
): Doc[] {
  return path.map(
    (itemPath) =>
      itemPath.node.comments.length === 0
        ? itemPath.call(print, 'variant')
        : print(itemPath),
    'items'
  );
}
