import { ASTNode } from '@solidity-parser/parser/src/ast-types';

// Adding our own options to prettier's `ParserOptions` interface.
declare module 'prettier' {
  interface ParserOptions {
    compiler: string;
    experimentalTernaries: boolean;
  }
}

declare module '@solidity-parser/parser/src/ast-types' {
  // Adding the properties that prettier expects from the `Comment` interface.
  interface Comment {
    leading?: boolean;
    trailing?: boolean;
    printed?: boolean;
    precedingNode?: ASTNode;
    enclosingNode?: ASTNode;
    followingNode?: ASTNode;
  }

  export interface BlockComment extends Comment {
    type: 'BlockComment';
  }

  export interface LineComment extends Comment {
    type: 'LineComment';
  }

  // All `ASTNode`s can have `comments`
  interface BaseASTNode {
    comments?: Comment[];
  }

  // `ForStatement`'s `initExpression` and `loopExpression` need the
  // `omitSemicolon` property
  interface ExpressionStatement {
    omitSemicolon?: boolean;
  }

  interface VariableDeclarationStatement {
    omitSemicolon?: boolean;
  }
}
