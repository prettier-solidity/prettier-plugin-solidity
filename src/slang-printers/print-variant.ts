import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode, PolymorphicNode } from '../slang-nodes/types.js';

// TODO: Create a type that contains all `StrictAstNode`s that contain at least
// a property that is a `PolymorphicNode | undefined`.
export function printVariant(
  property: string,
  path: AstPath,
  print: PrintFunction
): Doc {
  return path.call((polymorphicPath: AstPath<AstNode>) => {
    const node = polymorphicPath.node as PolymorphicNode | undefined;
    if (!node) return '';
    return node.comments.length === 0
      ? polymorphicPath.call(print, 'variant')
      : print(polymorphicPath);
  }, property);
}
