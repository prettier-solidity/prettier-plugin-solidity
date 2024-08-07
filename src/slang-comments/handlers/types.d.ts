import type { StrictAstNode } from '../../slang-nodes';
import type { Comment } from '../../types';

interface HandlerParams {
  text: string;
  precedingNode?: StrictAstNode;
  enclosingNode?: StrictAstNode;
  followingNode?: StrictAstNode;
  comment: Comment;
}
