import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class ImportClause implements SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  comments;

  loc;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(ast: ast.ImportClause, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case 'PathImport':
        this.variant = new PathImport(
          ast.variant as ast.PathImport,
          offsets[0],
          options
        );
        break;
      case 'NamedImport':
        this.variant = new NamedImport(
          ast.variant as ast.NamedImport,
          offsets[0],
          options
        );
        break;
      case 'ImportDeconstruction':
        this.variant = new ImportDeconstruction(
          ast.variant as ast.ImportDeconstruction,
          offsets[0],
          options
        );
        break;

      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
