import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { PolymorphicNode } from '../slang-nodes/types.js';

export function printVariant(
  property: string,
  path: AstPath,
  print: PrintFunction
): Doc {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (path.node[property] as PolymorphicNode).comments.length === 0
    ? path.call(print, property, 'variant')
    : path.call(print, property);
}
