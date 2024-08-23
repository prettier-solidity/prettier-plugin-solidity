import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type { Doc } from 'prettier';
import type { Location, SlangNode } from '../types';
import type { Comment } from '.';

export class Identifier implements SlangNode {
  readonly kind = TerminalKind.Identifier;

  comments: Comment[];

  loc: Location;

  value: string;

  constructor(ast: TerminalNode) {
    const metadata = getNodeMetadata(ast);

    this.value = ast.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.value;
  }
}
