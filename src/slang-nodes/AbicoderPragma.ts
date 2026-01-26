import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AbicoderVersion } from './AbicoderVersion.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

export class AbicoderPragma extends SlangNode {
  readonly kind = NonterminalKind.AbicoderPragma;

  version: AbicoderVersion;

  constructor(ast: ast.AbicoderPragma, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.version = new AbicoderVersion(ast.version, options);
  }

  print(path: AstPath<AbicoderPragma>, print: PrintFunction): Doc {
    return ['abicoder ', path.call(print, 'version')];
  }
}
