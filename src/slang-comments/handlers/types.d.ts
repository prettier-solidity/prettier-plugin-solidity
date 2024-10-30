import type { Comment, StrictAstNode } from '../../slang-nodes/types.d.ts';

interface HandlerParams {
  text: string;
  precedingNode?: StrictAstNode;
  enclosingNode?: StrictAstNode;
  followingNode?: StrictAstNode;
  comment: Comment;
}
