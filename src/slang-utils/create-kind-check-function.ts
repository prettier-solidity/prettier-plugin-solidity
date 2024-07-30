import { Node } from '@nomicfoundation/slang/cst';
import { astNode, Comment } from '../types';

export function createKindCheckFunction(
  kindsArray: string[]
): (node: astNode | Comment | Node) => boolean {
  const kinds = new Set(kindsArray);
  return (node: astNode | Comment | Node): boolean => kinds.has(node.kind);
}
