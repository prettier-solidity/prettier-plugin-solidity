import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class Statements extends SlangNode {
  readonly kind = NonterminalKind.Statements;

  items: Statement['variant'][];

  constructor(
    ast: ast.Statements,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new Statement(item, collected, options))
    );
  }

  print(
    print: PrintFunction,
    path: AstPath<Statements>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
