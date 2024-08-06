import type { Node } from '@nomicfoundation/slang/cst';
import type { Comment, StrictAstNode } from '../types';

export function createKindCheckFunction(
  kindsArray: string[]
): (node: StrictAstNode | Comment | Node) => boolean {
  const kinds = new Set(kindsArray);
  return (node: StrictAstNode | Comment | Node): boolean =>
    kinds.has(node.kind);
}
