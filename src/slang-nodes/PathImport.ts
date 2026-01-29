import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class PathImport extends SlangNode {
  readonly kind = NonterminalKind.PathImport;

  path: StringLiteral;

  alias?: ImportAlias;

  constructor(
    ast: ast.PathImport,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.path = new StringLiteral(ast.path, collected, options);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias, collected);
    }

    this.updateMetadata(this.path, this.alias);
  }

  print(path: AstPath<PathImport>, print: PrintFunction): Doc {
    return [path.call(print, 'path'), path.call(print, 'alias')];
  }
}
