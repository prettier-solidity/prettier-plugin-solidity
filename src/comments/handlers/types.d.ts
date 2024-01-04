import type {
  ASTNode,
  Comment,
  SourceUnit
} from '@solidity-parser/parser/src/ast-types';

interface HandlerArguments {
  text: string;
  precedingNode?: ASTNode;
  enclosingNode?: ASTNode;
  followingNode?: ASTNode;
  comment: Comment;
  ast: SourceUnit;
  isLastComment: boolean;
}
