import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ImportClause,
  ast.ImportClause
>([
  [ast.PathImport, PathImport],
  [ast.NamedImport, NamedImport],
  [ast.ImportDeconstruction, ImportDeconstruction]
]);

export class ImportClause extends SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(
    ast: ast.ImportClause,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
