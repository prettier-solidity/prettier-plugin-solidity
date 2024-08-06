import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

const { dedent, line } = doc.builders;

export class YulLabel implements SlangNode {
  readonly kind = NonterminalKind.YulLabel;

  comments;

  loc;

  label: string;

  constructor(ast: ast.YulLabel, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.label = ast.label.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return [dedent(line), `${this.label}:`];
  }
}
