import type { Comment, StrictAstNode } from '../../slang-nodes';

interface HandlerParams {
  text: string;
  precedingNode?: StrictAstNode;
  enclosingNode?: StrictAstNode;
  followingNode?: StrictAstNode;
  comment: Comment;
}
