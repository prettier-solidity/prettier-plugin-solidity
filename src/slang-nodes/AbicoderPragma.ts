import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class AbicoderPragma extends SlangNode {
  readonly kind = NonterminalKind.AbicoderPragma;

  version: TerminalNode;

  constructor(ast: ast.AbicoderPragma) {
    super(ast);

    this.version = new TerminalNode(ast.version);
  }

  print(path: AstPath<AbicoderPragma>, print: PrintFunction): Doc {
    return ['abicoder ', path.call(print, 'version')];
  }
}
