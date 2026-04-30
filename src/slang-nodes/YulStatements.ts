import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulStatement } from './YulStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class YulStatements extends SlangNode {
  readonly kind = NonterminalKind.YulStatements;

  items: YulStatement['variant'][];

  constructor(ast: ast.YulStatements, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new YulStatement(item, collected))
    );
  }

  print(
    print: PrintFunction,
    path: AstPath<YulStatements>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
