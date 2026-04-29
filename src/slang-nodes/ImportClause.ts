import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.ImportClause,
  ImportClause
>([
  [ast.PathImport, PathImport],
  [ast.NamedImport, NamedImport],
  [ast.ImportDeconstruction, ImportDeconstruction]
]);

export class ImportClause extends PolymorphicNonterminalNode<
  ast.ImportClause,
  PathImport | NamedImport | ImportDeconstruction
> {
  readonly kind = NonterminalKind.ImportClause;

  constructor(ast: ast.ImportClause, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
