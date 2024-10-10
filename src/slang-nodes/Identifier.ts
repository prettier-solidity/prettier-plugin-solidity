import { TerminalKind, TerminalNode } from '@nomicfoundation/slang/cst';

import type { Doc } from 'prettier';
import type { Location, SlangNode } from '../types.d.ts';
import type { Comment } from './index.d.ts';

export class Identifier implements SlangNode {
  readonly kind = TerminalKind.Identifier;

  comments: Comment[];

  loc: Location;

  value: string;

  constructor(ast: TerminalNode, offset: number) {
    this.value = ast.unparse();

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
