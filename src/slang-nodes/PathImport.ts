import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class PathImport implements SlangNode {
  readonly kind = NonterminalKind.PathImport;

  comments;

  loc;

  path: StringLiteral;

  alias?: ImportAlias;

  constructor(ast: ast.PathImport, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    this.path = new StringLiteral(ast.path, options);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias);
    }

    [this.loc, this.comments] = updateMetadata(metadata, [
      this.path,
      this.alias
    ]);
  }

  print(path: AstPath<PathImport>, print: PrintFunction): Doc {
    return [path.call(print, 'path'), path.call(print, 'alias')];
  }
}
