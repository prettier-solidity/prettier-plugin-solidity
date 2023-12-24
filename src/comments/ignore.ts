import { getNode } from '../common/backward-compatibility.js';
import type { ASTNode, Comment } from '@solidity-parser/parser/src/ast-types';
import type { AstPath } from 'prettier';

export default function ignoreComments(path: AstPath): void {
  // TODO: remove undefined once we stop supporting prettier 2
  const node = getNode(path) as ASTNode | null | undefined;
  // We ignore anything that is not an object
  if (node === null || node === undefined || typeof node !== 'object') return;

  const keys = Object.keys(node) as (keyof ASTNode)[];
  keys.forEach((key) => {
    switch (key) {
      // We ignore `loc` and `range` since these are added by the parser
      case 'loc':
      case 'range':
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
