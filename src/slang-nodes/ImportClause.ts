import { NonterminalKind, SlangAst } from '../slang-utils/slang.ts';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { PathImport } from './PathImport.ts';
import { NamedImport } from './NamedImport.ts';
import { ImportDeconstruction } from './ImportDeconstruction.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.ImportClause,
  ImportClause
>(() => [
  [SlangAst.PathImport, PathImport],
  [SlangAst.NamedImport, NamedImport],
  [SlangAst.ImportDeconstruction, ImportDeconstruction]
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
