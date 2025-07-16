import { PolymorphicNode } from '../slang-nodes/PolymorphicNode.js';

import type {
  StrictPolymorphicNode,
  StrictAstNode
} from '../slang-nodes/types.d.ts';

export function isPolymorphicNode(
  node: StrictAstNode
): node is StrictPolymorphicNode {
  return node instanceof PolymorphicNode;
}
