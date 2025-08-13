const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class AbicoderPragma extends SlangNode {
  readonly kind = NonterminalKind.AbicoderPragma;

  version: Identifier;

  constructor(ast: ast.AbicoderPragma) {
    super(ast);

    this.version = new Identifier(ast.version);
  }

  print(path: AstPath<AbicoderPragma>, print: PrintFunction): Doc {
    return ['abicoder ', path.call(print, 'version')];
  }
}
