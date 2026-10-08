import addCollectionFirstComment from './add-collection-first-comment.ts';
import addCollectionLastComment from './add-collection-last-comment.ts';

import type { StrictCollection } from '../../slang-nodes/types.d.ts';
import type { HandlerParams } from './types.d.ts';

// A comment right outside a collection, between it and its delimiters, is
// moved into it: after its last item when it follows the collection, before
// its first item when it precedes it, or dangling when the collection is empty.
export default function addCollectionAdjacentComment(
  collectionKind: StrictCollection['kind'],
  { precedingNode, followingNode, comment }: HandlerParams
): boolean {
  if (precedingNode?.kind === collectionKind) {
    addCollectionLastComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === collectionKind) {
    addCollectionFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
