import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import {
  isIndentableBlockComment,
  printIndentableBlockComment
} from '../slang-comments/printer.js';

import type { Doc } from 'prettier';
import type { BaseComment, Location, SlangNode } from '../types';
import type { StrictAstNode } from '.';

const { join, literalline } = doc.builders;

export class MultiLineComment implements SlangNode, BaseComment {
  readonly kind = TerminalKind.MultiLineComment;

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
    if (isIndentableBlockComment(this)) {
      return printIndentableBlockComment(this);
    }
    return join(literalline, this.value.split('\n'));
  }
}
