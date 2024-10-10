import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class AbicoderPragma implements SlangNode {
  readonly kind = NonterminalKind.AbicoderPragma;

  comments;

  loc;

  version: Identifier;

  constructor(ast: ast.AbicoderPragma, offset: number) {
    const metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.version = new Identifier(ast.version, offsets[0]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<AbicoderPragma>, print: PrintFunction): Doc {
    return ['abicoder ', path.call(print, 'version')];
  }
}
