import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { VariantCollection } from './VariantCollection.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class Statements extends VariantCollection<ast.Statements, Statement> {
  readonly kind = NonterminalKind.Statements;

  constructor(ast: ast.Statements, collected: CollectedMetadata) {
    super(ast, collected, Statement);
  }

  print(
    print: PrintFunction,
    path: AstPath<Statements>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
