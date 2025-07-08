import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Pragma } from './Pragma.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class PragmaDirective implements SlangNode {
  readonly kind = NonterminalKind.PragmaDirective;

  comments;

  loc;

  pragma: Pragma;

  constructor(ast: ast.PragmaDirective, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.pragma = new Pragma(ast.pragma, options);

    updateMetadata(this.loc, this.comments, [this.pragma]);
  }

  print(path: AstPath<PragmaDirective>, print: PrintFunction): Doc {
    return ['pragma ', path.call(print, 'pragma'), ';'];
  }
}
