import type { Node } from '@nomicfoundation/slang/cst';
import type {
  NonterminalKind,
  TerminalKind
} from '@nomicfoundation/slang/kinds';
import type { StrictAstNode } from '../slang-nodes';

export function createKindCheckFunction(
  kindsArray: (keyof typeof TerminalKind | keyof typeof NonterminalKind)[]
): (node: StrictAstNode | Node) => boolean {
  const kinds = new Set(kindsArray);
  return (node: StrictAstNode | Node): boolean => kinds.has(node.kind);
}
