import type { AstNode, Comment } from '../types';

export function locStart(node: AstNode | Comment): number {
  if (typeof node === 'string' || typeof node === 'undefined') return -1;
  return node.loc.start;
}

export function locEnd(node: AstNode | Comment): number {
  if (typeof node === 'string' || typeof node === 'undefined') return -1;
  return node.loc.end;
}
