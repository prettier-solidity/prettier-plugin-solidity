import type {
  Node,
  NonterminalKind,
  TerminalKind
} from '@nomicfoundation/slang/cst';
import type { PrintableNode } from '../slang-nodes/types.d.ts';

// The kinds are read on the first check: these functions are usually created
// while a module loads, before Slang (and so its kind enums) has been loaded.
export function createKindCheckFunction(
  getKinds: () => (keyof typeof TerminalKind | keyof typeof NonterminalKind)[]
): (node: PrintableNode | Node) => boolean {
  let kinds: Set<string> | undefined;
  return (node: PrintableNode | Node): boolean => {
    kinds ??= new Set(getKinds());
    return kinds.has(node.kind);
  };
}
