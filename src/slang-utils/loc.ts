import type { AstNode } from '../slang-nodes/types.d.ts';

export function locStart(node: AstNode): number {
  if (typeof node === 'string' || typeof node === 'undefined') return -1;
  return node.loc.start;
}

export function locEnd(node: AstNode): number {
  if (typeof node === 'string' || typeof node === 'undefined') return -1;
  return node.loc.end;
}
