import type { Comment, StrictAstNode } from '../../types';

interface HandlerParams {
  text: string;
  precedingNode?: StrictAstNode;
  enclosingNode?: StrictAstNode;
  followingNode?: StrictAstNode;
  comment: Comment;
}
