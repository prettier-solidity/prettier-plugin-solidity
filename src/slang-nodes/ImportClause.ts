import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ImportClause implements SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  comments;

  loc;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(ast: ast.ImportClause) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.PathImport:
        this.variant = new PathImport(ast.variant as ast.PathImport);
        break;
      case NonterminalKind.NamedImport:
        this.variant = new NamedImport(ast.variant as ast.NamedImport);
        break;
      case NonterminalKind.ImportDeconstruction:
        this.variant = new ImportDeconstruction(
          ast.variant as ast.ImportDeconstruction
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ImportClause>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
