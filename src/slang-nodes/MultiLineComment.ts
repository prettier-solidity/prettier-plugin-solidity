import { TerminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isIndentableBlockComment } from '../slang-utils/is-indentable-block-comment.js';
import { printIndentableBlockComment } from '../slang-printers/print-indentable-block-comment.js';

import type { Doc } from 'prettier';
import type { BaseComment, Location, SlangNode } from '../types.d.ts';
import type { StrictAstNode } from './index.d.ts';

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
    this.value = ast.unparse();

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