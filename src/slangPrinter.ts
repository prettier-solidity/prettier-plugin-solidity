import { prettierVersionSatisfies } from './slang-utils/prettier-version-satisfies.js';
import { isBlockComment } from './slang-utils/is-comment.js';
import { locEnd, locStart } from './slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, Comment } from './types';

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

function hasNodeIgnoreComment(node: AstNode): boolean {
  return (
    node?.comments &&
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
  const node = path.getNode() as AstNode | null | undefined;
  // We ignore anything that is not an object
  if (node === null || node === undefined || typeof node !== 'object') return;

  const keys = Object.keys(node) as (keyof AstNode)[];
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
          const comment = commentPath.getNode() as Comment;
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

function genericPrint(
  path: AstPath<AstNode>,
  options: ParserOptions<AstNode>,
  print: (path: AstPath<AstNode>) => Doc
): Doc {
  prettierVersionCheck();

  const node = path.getNode();

  if (node === null || node === undefined) {
    return '';
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(locStart(node), locEnd(node));
  }

  return node.print(
    path as AstPath<never>,
    print as (path: AstPath<AstNode | string | undefined>) => Doc,
    options
  );
}

export default genericPrint;
