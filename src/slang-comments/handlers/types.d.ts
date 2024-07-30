import type { astNode, Comment } from '../../types';

interface HandlerParams {
  text: string;
  precedingNode?: astNode;
  enclosingNode?: astNode;
  followingNode?: astNode;
  comment: Comment;
}
