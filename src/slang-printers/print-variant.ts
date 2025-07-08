import type { AstPath, Doc } from 'prettier';
import type { PolymorphicNode } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export function printVariant(
  { variant }: PolymorphicNode,
  path: AstPath<PolymorphicNode>,
  print: PrintFunction
): Doc {
  return typeof variant === 'string' ? variant : path.call(print, 'variant');
}
