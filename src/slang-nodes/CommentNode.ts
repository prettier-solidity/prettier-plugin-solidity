import type { TerminalNode } from '@nomicfoundation/slang/cst';
import type { Location } from '../types.d.ts';
import type { StrictAstNode } from './types.d.ts';

export class CommentNode {
  loc: Location;

  leading?: boolean;

  trailing?: boolean;

  printed?: boolean;

  placement?: 'endOfLine' | 'ownLine' | 'remaining';

  precedingNode?: StrictAstNode;

  enclosingNode?: StrictAstNode;

  followingNode?: StrictAstNode;

  constructor(ast: TerminalNode, offset: number) {
    this.loc = {
      start: offset,
      end: offset + ast.textLength.utf16
    };
  }
}
