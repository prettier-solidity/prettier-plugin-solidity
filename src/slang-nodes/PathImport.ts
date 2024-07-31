import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class PathImport implements SlangNode {
  readonly kind = NonterminalKind.PathImport;

  comments;

  loc;

  path: StringLiteral;

  alias?: ImportAlias;

  constructor(ast: ast.PathImport, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.path = new StringLiteral(ast.path, offsets[0], options);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias, offsets[1]);
    }

    metadata = updateMetadata(metadata, [this.path, this.alias]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      path.call(print, 'path'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
