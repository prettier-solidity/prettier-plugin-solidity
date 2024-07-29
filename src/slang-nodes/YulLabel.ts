import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/get-offsets.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.js';

const { dedent, line } = doc.builders;

export class YulLabel implements SlangNode {
  readonly kind = NonterminalKind.YulLabel;

  comments;

  loc;

  label: string;

  colon: string;

  constructor(ast: ast.YulLabel, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.label = ast.label.text;
    this.colon = ast.colon.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return [dedent(line), `${this.label}${this.colon}`];
  }
}
