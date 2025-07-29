import { PolymorphicNode as PolymorphicNodeBase } from '../slang-nodes/PolymorphicNode.js';
import type { PolymorphicNode, StrictAstNode } from '../slang-nodes/types.d.ts';

export function isPolymorphicNode(
  node: StrictAstNode
): node is PolymorphicNode {
  return node instanceof PolymorphicNodeBase;
}
