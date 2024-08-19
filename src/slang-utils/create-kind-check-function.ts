import type { Node } from '@nomicfoundation/slang/cst';
import type { StrictAstNode } from '../slang-nodes';

export function createKindCheckFunction(
  kindsArray: string[]
): (node: StrictAstNode | Node) => boolean {
  const kinds = new Set(kindsArray);
  return (node: StrictAstNode | Node): boolean => kinds.has(node.kind);
}
