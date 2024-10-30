import type {
  Node,
  NonterminalKind,
  TerminalKind
} from '@nomicfoundation/slang/cst';
import type { StrictAstNode } from '../slang-nodes/types.d.ts';

export function createKindCheckFunction(
  kindsArray: (keyof typeof TerminalKind | keyof typeof NonterminalKind)[]
): (node: StrictAstNode | Node) => boolean {
  const kinds = new Set(kindsArray);
  return (node: StrictAstNode | Node): boolean => kinds.has(node.kind);
}
