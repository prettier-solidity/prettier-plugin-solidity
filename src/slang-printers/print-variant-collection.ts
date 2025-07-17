import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { StrictCollection } from '../slang-nodes/types.ts';

export function printVariantCollection(
  path: AstPath<StrictCollection>,
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
