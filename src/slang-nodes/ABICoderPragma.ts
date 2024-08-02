import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class ABICoderPragma implements SlangNode {
  readonly kind = NonterminalKind.ABICoderPragma;

  comments;

  loc;

  abicoderKeyword: string;

  version: string;

  constructor(ast: ast.ABICoderPragma, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.abicoderKeyword = ast.abicoderKeyword.text;
    this.version = ast.version.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return `${this.abicoderKeyword} ${this.version}`;
  }
}
