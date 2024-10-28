import { TerminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type { Doc } from 'prettier';
import type { BaseComment, Location, SlangNode } from '../types.d.ts';
import type { StrictAstNode } from './types.d.ts';

export class SingleLineNatSpecComment implements SlangNode, BaseComment {
  readonly kind = TerminalKind.SingleLineNatSpecComment;

  loc: Location;

  value: string;

  leading?: boolean;

  trailing?: boolean;

  printed?: boolean;

  placement?: 'endOfLine' | 'ownLine' | 'remaining';

  precedingNode?: StrictAstNode;

  enclosingNode?: StrictAstNode;

  followingNode?: StrictAstNode;

  constructor(ast: TerminalNode) {
    const metadata = getNodeMetadata(ast);

    this.value = ast.unparse();

    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.value.trimEnd();
  }
}
