import type { Comment, PrintableNode } from '../slang-nodes/types.d.ts';

export function locStart(node: PrintableNode | Comment): number {
  return node.loc.start;
}

export function locEnd(node: PrintableNode | Comment): number {
  return node.loc.end;
}
