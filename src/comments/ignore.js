import { getNode } from '../common/backward-compatibility.js';

export default function ignoreComments(path) {
  const node = getNode(path);
  // We ignore anything that is not an object
  if (node === null || node === undefined || typeof node !== 'object') return;

  const keys = Object.keys(node);
  let childNode;
  keys.forEach((key) => {
    switch (key) {
      // We ignore `loc` and `range` since these are added by the parser
      case 'loc':
      case 'range':
        break;
      // The key `comments` will contain every comment for this node
      case 'comments':
        path.each((commentPath) => {
          const comment = getNode(commentPath);
          comment.printed = true;
        }, 'comments');
        break;
      default:
        // If the value for that key is an Array or an Object we go deeper.
        childNode = node[key];
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
