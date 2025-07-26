import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.ImportClause['variant'],
  options: ParserOptions<AstNode>
): ImportClause['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.PathImport:
      return new PathImport(variant as ast.PathImport, options);
    case NonterminalKind.NamedImport:
      return new NamedImport(variant as ast.NamedImport, options);
    case NonterminalKind.ImportDeconstruction:
      return new ImportDeconstruction(
        variant as ast.ImportDeconstruction,
        options
      );
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class ImportClause extends SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(ast: ast.ImportClause, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ImportClause>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
