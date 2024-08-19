import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';

import type { Doc } from 'prettier';
import type { Location, SlangNode } from '../types';
import type { Comment } from '.';

export class Identifier implements SlangNode {
  readonly kind = TerminalKind.Identifier;

  comments: Comment[];

  loc: Location;

  value: string;

  constructor(ast: TerminalNode, offset: number) {
    this.value = ast.text;

    this.comments = [];
    this.loc = {
      start: offset,
      end: offset + ast.textLength.utf16
    };
  }

  print(): Doc {
    return this.value;
  }
}
