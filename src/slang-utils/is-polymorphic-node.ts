import type { PolymorphicNode, StrictAstNode } from '../slang-nodes/types.d.ts';

export function isPolymorphicNode(
  node: StrictAstNode
): node is PolymorphicNode {
  return typeof (node as PolymorphicNode).variant !== 'undefined';
}
