import { isBlockComment } from './slang-utils/is-comment.js';
import { locEnd, locStart } from './slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, StrictAstNode } from './slang-nodes/types.d.ts';
import type { PrintFunction } from './types.d.ts';

function hasNodeIgnoreComment({ comments }: StrictAstNode): boolean {
  // Prettier sets SourceUnit's comments to undefined after assigning comments
  // to each node.
  return comments?.some(
    (comment) =>
      comment.value
        .slice(2, isBlockComment(comment) ? -2 : undefined)
        .trim() === 'prettier-ignore'
  );
}

function ignoreComments(path: AstPath<AstNode>): void {
  const node = path.node;
  // We ignore anything that is not an object
  if (node === null || typeof node !== 'object') return;

  let key: keyof StrictAstNode;
  for (key in node) {
    switch (key) {
      // We ignore `kind`, `loc`, and comments since these are added by the
      // parser
      case 'kind':
      case 'loc':
      case 'print':
        break;
      // The key `comments` will contain every comment for this node
      case 'comments':
        path.each((commentPath) => (commentPath.node.printed = true), key);
        break;
      default:
        // If the value for that key is an Array or an Object we go deeper.
        const childNode = node[key];
        if (typeof childNode === 'object') {
          if (Array.isArray(childNode)) {
            path.each(ignoreComments, key);
            return;
          }
          path.call(ignoreComments, key);
        }
    }
  }
}

// Nodes take care of undefined and string properties so we can restrict path
// to AstPath<StrictAstNode>
function genericPrint(
  path: AstPath<StrictAstNode>,
  options: ParserOptions<AstNode>,
  print: PrintFunction
): Doc {
  const node = path.node;

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(locStart(node), locEnd(node));
  }

  // Since each node has a print function with a specific AstPath, the union of
  // all nodes into AstNode creates a print function with an AstPath of the
  // intersection of all nodes. This forces us to cast this with a never type.
  return node.print(path as AstPath<never>, print, options);
}

export default genericPrint;
