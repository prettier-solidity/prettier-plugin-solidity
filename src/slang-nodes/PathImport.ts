import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class PathImport implements SlangNode {
  readonly kind = NonterminalKind.PathImport;

  comments;

  loc;

  path: StringLiteral;

  alias?: ImportAlias;

  constructor(ast: ast.PathImport) {
    let metadata = getNodeMetadata(ast);

    this.path = new StringLiteral(ast.path);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias);
    }

    metadata = updateMetadata(metadata, [this.path, this.alias]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<PathImport>, print: PrintFunction): Doc {
    return [path.call(print, 'path'), path.call(print, 'alias')];
  }
}
