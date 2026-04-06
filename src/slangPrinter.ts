import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintableNode } from './slang-nodes/types.d.ts';
import type { PrintFunction } from './types.d.ts';

// Nodes take care of undefined and string properties so we can restrict path
// to AstPath<StrictAstNode>
function genericPrint(
  path: AstPath<PrintableNode>,
  options: ParserOptions<AstNode>,
  print: PrintFunction
): Doc {
  // Since each node has a print function with a specific AstPath, the union of
  // all nodes into AstNode creates a print function with an AstPath of the
  // intersection of all nodes. This forces us to cast this with a never type.
  return path.node.print(path as AstPath<never>, print, options);
}

export default genericPrint;
