import type { AstNode, Comment } from '../../types';

interface HandlerParams {
  text: string;
  precedingNode?: AstNode;
  enclosingNode?: AstNode;
  followingNode?: AstNode;
  comment: Comment;
}
