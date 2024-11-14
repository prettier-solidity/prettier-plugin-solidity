import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportAlias } from './ImportAlias.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class NamedImport implements SlangNode {
  readonly kind = NonterminalKind.NamedImport;

  comments;

  loc;

  alias: ImportAlias;

  path: StringLiteral;

  constructor(ast: ast.NamedImport, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.alias = new ImportAlias(ast.alias);
    this.path = new StringLiteral(ast.path, options);

    metadata = updateMetadata(metadata, [this.alias, this.path]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<NamedImport>, print: PrintFunction): Doc {
    return ['*', path.call(print, 'alias'), ' from ', path.call(print, 'path')];
  }
}
