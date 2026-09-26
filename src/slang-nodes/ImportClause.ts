import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { PathImport } from './PathImport.ts';
import { NamedImport } from './NamedImport.ts';
import { ImportDeconstruction } from './ImportDeconstruction.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.ImportClause,
  ImportClause
>([
  [ast.PathImport, PathImport],
  [ast.NamedImport, NamedImport],
  [ast.ImportDeconstruction, ImportDeconstruction]
]);

export class ImportClause extends SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(ast: ast.ImportClause, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
