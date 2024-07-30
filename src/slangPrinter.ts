import { prettierVersionSatisfies } from './slang-utils/prettier-version-satisfies.js';
import { getNode } from './slang-utils/backward-compatibility.js';
import { isBlockComment } from './slang-utils/is-comment.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { astNode, Comment } from './types.js';

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

function hasNodeIgnoreComment(node: astNode): boolean {
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

function ignoreComments(path: AstPath): void {
  // TODO: remove undefined once we stop supporting prettier 2
  const node = getNode(path) as astNode | null | undefined;
  // We ignore anything that is not an object
  if (node === null || node === undefined || typeof node !== 'object') return;

  const keys = Object.keys(node) as (keyof astNode)[];
  keys.forEach((key) => {
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
          const comment = getNode(commentPath) as Comment;
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
  });
}

function genericPrint(
  path: AstPath,
  options: ParserOptions,
  print: (path: AstPath) => Doc
): Doc {
  prettierVersionCheck();

  const node = getNode(path) as astNode | null | undefined;

  if (node === null || node === undefined) {
    return '';
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(
      options.locStart(node),
      options.locEnd(node)
    );
  }

  return node.print(path, print, options);
}

export default genericPrint;
