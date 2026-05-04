import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class NamedImport extends SlangNode {
  readonly kind = NonterminalKind.NamedImport;

  alias: ImportAlias;

  path: StringLiteral;

  constructor(ast: ast.NamedImport, collected: CollectedMetadata) {
    super(ast, collected);

    this.alias = new ImportAlias(ast.alias, collected);
    this.path = new StringLiteral(ast.path, collected);

    this.updateMetadata(this.alias, this.path);
  }

  print(print: PrintFunction): Doc {
    return ['*', print('alias'), ' from ', print('path')];
  }
}
