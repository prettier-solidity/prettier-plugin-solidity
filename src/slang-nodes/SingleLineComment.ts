import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';

import type { Doc } from 'prettier';
import type { BaseComment, Location, SlangNode } from '../types';
import type { StrictAstNode } from '.';

export class SingleLineComment implements SlangNode, BaseComment {
  readonly kind = TerminalKind.SingleLineComment;

  loc: Location;

  value: string;

  leading?: boolean;

  trailing?: boolean;

  printed?: boolean;

  placement?: 'endOfLine' | 'ownLine' | 'remaining';

  precedingNode?: StrictAstNode;

  enclosingNode?: StrictAstNode;

  followingNode?: StrictAstNode;

  constructor(ast: TerminalNode, offset: number) {
    this.value = ast.text;

    this.loc = {
      start: offset,
      end: offset + ast.textLength.utf16
    };
  }

  print(): Doc {
    return this.value.trimEnd();
  }
}
