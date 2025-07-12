import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Pragma } from './Pragma.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class PragmaDirective extends SlangNode {
  readonly kind = NonterminalKind.PragmaDirective;

  pragma: Pragma;

  constructor(ast: ast.PragmaDirective, options: ParserOptions<AstNode>) {
    super(ast);

    this.pragma = new Pragma(ast.pragma, options);

    this.updateMetadata(this.pragma);
  }

  print(path: AstPath<PragmaDirective>, print: PrintFunction): Doc {
    return ['pragma ', path.call(print, 'pragma'), ';'];
  }
}
