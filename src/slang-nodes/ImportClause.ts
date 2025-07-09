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

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.PathImport:
        this.variant = new PathImport(variant as ast.PathImport, options);
        break;
      case NonterminalKind.NamedImport:
        this.variant = new NamedImport(variant as ast.NamedImport, options);
        break;
      case NonterminalKind.ImportDeconstruction:
        this.variant = new ImportDeconstruction(
          variant as ast.ImportDeconstruction,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ImportClause>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
