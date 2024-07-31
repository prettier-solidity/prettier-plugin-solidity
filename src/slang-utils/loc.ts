import type { AstNode, Comment } from '../types';

export function locStart(node: AstNode | Comment): number {
  return node.loc.start;
}

export function locEnd(node: AstNode | Comment): number {
  return node.loc.end;
}
