import type { TerminalNode } from '@nomicfoundation/slang/cst';
import type { Location } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export abstract class CommentNode {
  loc: Location;

  leading?: boolean;

  trailing?: boolean;

  printed?: boolean;

  placement?: 'endOfLine' | 'ownLine' | 'remaining';

  precedingNode?: PrintableNode;

  enclosingNode?: PrintableNode;

  followingNode?: PrintableNode;

  protected constructor(ast: TerminalNode, offset: number) {
    this.loc = {
      start: offset,
      end: offset + ast.textLength.utf16
    };
  }
}
