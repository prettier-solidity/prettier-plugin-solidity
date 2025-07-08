import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ImportClause extends SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(ast: ast.ImportClause, options: ParserOptions<AstNode>) {
    super(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.PathImport:
        this.variant = new PathImport(ast.variant as ast.PathImport, options);
        break;
      case NonterminalKind.NamedImport:
        this.variant = new NamedImport(ast.variant as ast.NamedImport, options);
        break;
      case NonterminalKind.ImportDeconstruction:
        this.variant = new ImportDeconstruction(
          ast.variant as ast.ImportDeconstruction,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    this.updateMetadata([this.variant]);
  }

  print(path: AstPath<ImportClause>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
