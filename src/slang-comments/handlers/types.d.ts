import type { Comment, PrintableNode } from '../../slang-nodes/types.d.ts';

interface HandlerParams {
  text: string;
  precedingNode?: PrintableNode;
  enclosingNode?: PrintableNode;
  followingNode?: PrintableNode;
  comment: Comment;
}
