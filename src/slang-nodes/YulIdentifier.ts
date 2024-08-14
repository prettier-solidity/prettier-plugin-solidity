import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';

import type { Doc } from 'prettier';
import type { AstLocation, Comment, SlangNode } from '../types';

export class YulIdentifier implements SlangNode {
  readonly kind = TerminalKind.YulIdentifier;

  comments: Comment[];

  loc: AstLocation;

  value: string;

  constructor(ast: TerminalNode, offset: number) {
    this.value = ast.text;

    this.comments = [];
    this.loc = {
      start: offset,
      end: offset + ast.textLength.utf8,
      leadingOffset: 0,
      trailingOffset: 0
    };
  }

  print(): Doc {
    return this.value;
  }
}
