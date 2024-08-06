import { prettierVersionSatisfies } from './slang-utils/prettier-version-satisfies.js';
import { isBlockComment } from './slang-utils/is-comment.js';
import { locEnd, locStart } from './slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, StrictAstNode } from './types';

let checked = false;

function prettierVersionCheck(): void {
  if (checked) return;
  if (!prettierVersionSatisfies('>=2.3.0')) {
    throw new Error(
      'The version of prettier in your node-modules does not satisfy the required ">=2.3.0" constraint. Please update the version of Prettier.'
    );
  }
  checked = true;
}

function hasNodeIgnoreComment(node: StrictAstNode): boolean {
  // Prettier sets SourceUnit's comments to undefined after assigning comments
  // to each node.
  return (
    node.comments &&
    node.comments.some(
      (comment) =>
        comment.value
          .slice(2, isBlockComment(comment) ? -2 : undefined)
          .trim() === 'prettier-ignore'
    )
  );
}

function ignoreComments(path: AstPath<AstNode>): void {
  // TODO: remove undefined once we stop supporting prettier 2
  const node = path.getNode();
  // We ignore anything that is not an object
  if (node === null || node === undefined || typeof node !== 'object') return;

  const keys = Object.keys(node) as (keyof StrictAstNode)[];
  for (const key of keys) {
    switch (key) {
      // We ignore `kind`, `loc`, and comments since these are added by the
      // parser
      case 'kind':
      case 'loc':
      case 'print':
        break;
      // The key `comments` will contain every comment for this node
      case 'comments':
        path.each((commentPath) => {
          const comment = commentPath.getNode()!;
          comment.printed = true;
        }, 'comments');
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
  prettierVersionCheck();

  const node = path.getNode()!;

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
