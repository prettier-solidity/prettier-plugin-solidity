import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { StrictPolymorphicNode } from '../slang-nodes/types.d.ts';

export const printVariant =
  (print: PrintFunction) =>
  (path: AstPath<StrictPolymorphicNode | undefined>): Doc => {
    const node = path.node;
    if (!node) return '';
    return node.comments && node.comments.length > 0
      ? print(path)
      : path.call(print, 'variant');
  };
