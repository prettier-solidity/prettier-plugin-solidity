import { Node } from '@nomicfoundation/slang/cst';

import type { AstNode, Comment } from '../types';

export function createKindCheckFunction(
  kindsArray: string[]
): (node: AstNode | Comment | Node) => boolean {
  const kinds = new Set(kindsArray);
  return (node: AstNode | Comment | Node): boolean => kinds.has(node.kind);
}
