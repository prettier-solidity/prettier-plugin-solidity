import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.ImportClause['variant'],
  options: ParserOptions<AstNode>
): ImportClause['variant'] {
  if (variant instanceof ast.PathImport) {
    return new PathImport(variant, options);
  }
  if (variant instanceof ast.NamedImport) {
    return new NamedImport(variant, options);
  }
  if (variant instanceof ast.ImportDeconstruction) {
    return new ImportDeconstruction(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class ImportClause extends SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(ast: ast.ImportClause, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
