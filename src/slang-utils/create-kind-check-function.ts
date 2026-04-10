import type {
  Node,
  NonterminalKind,
  TerminalKind
} from '@nomicfoundation/slang/cst';
import type { PrintableNode } from '../slang-nodes/types.d.ts';

export function createKindCheckFunction(
  kindsArray: (keyof typeof TerminalKind | keyof typeof NonterminalKind)[]
): (node: PrintableNode | Node) => boolean {
  const kinds = new Set(kindsArray);
  return (node: PrintableNode | Node): boolean => kinds.has(node.kind);
}
