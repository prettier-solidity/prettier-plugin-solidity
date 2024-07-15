import { doc } from 'prettier';
import { isLast, isNextLineEmpty } from '../common/backward-compatibility.js';

const { hardline } = doc.builders;

export function printPreservingEmptyLines(path, key, options, print) {
  return path.map((childPath, index) => {
    const node = childPath.getNode();

    return [
      // Only attempt to prepend an empty line if `node` is not the first item
      index > 0 &&
      // YulLabel adds a dedented line so we don't have to prepend a hardline.
      (node.kind !== 'YulStatement' || node.variant.kind !== 'YulLabel')
        ? hardline
        : '',
      print(childPath),
      // Only attempt to append an empty line if `node` is not the last item
      !isLast(childPath, key, index) &&
      // Append an empty line if the original text already had an one after the
      // current `node`
      isNextLineEmpty(options.originalText, options.locEnd(node))
        ? hardline
        : ''
    ];
  }, key);
}
