import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class NamedImport extends SlangNode {
  readonly kind = NonterminalKind.NamedImport;

  alias: ImportAlias;

  path: StringLiteral;

  constructor(ast: ast.NamedImport, options: ParserOptions<AstNode>) {
    super(ast);

    this.alias = new ImportAlias(ast.alias);
    this.path = new StringLiteral(ast.path, options);

    this.updateMetadata(this.alias, this.path);
  }

  print(path: AstPath<NamedImport>, print: PrintFunction): Doc {
    return ['*', path.call(print, 'alias'), ' from ', path.call(print, 'path')];
  }
}
