import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { VariantCollection } from './VariantCollection.js';
import { YulStatement } from './YulStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class YulStatements extends VariantCollection<
  ast.YulStatements,
  YulStatement
> {
  readonly kind = NonterminalKind.YulStatements;

  constructor(ast: ast.YulStatements, collected: CollectedMetadata) {
    super(ast, collected, YulStatement);
  }

  print(
    print: PrintFunction,
    path: AstPath<YulStatements>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
