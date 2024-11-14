import { TerminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type { Doc } from 'prettier';
import type { Location, SlangNode } from '../types.d.ts';
import type { Comment } from './types.d.ts';

export class YulIdentifier implements SlangNode {
  readonly kind = TerminalKind.YulIdentifier;

  comments: Comment[];

  loc: Location;

  value: string;

  constructor(ast: TerminalNode) {
    const metadata = getNodeMetadata(ast);

    this.value = ast.unparse();

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.value;
  }
}
