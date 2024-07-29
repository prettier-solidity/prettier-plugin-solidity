import type { astNode, Comment } from '../types';

export function locStart(node: astNode | Comment): number {
  return node.loc.start;
}

export function locEnd(node: astNode | Comment): number {
  return node.loc.end;
}
