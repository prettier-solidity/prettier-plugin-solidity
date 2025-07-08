import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { YulStatement } from './YulStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class YulStatements extends SlangNode {
  readonly kind = NonterminalKind.YulStatements;

  items: YulStatement[];

  constructor(ast: ast.YulStatements, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new YulStatement(item, options));

    this.updateMetadata(this.items);
  }

  print(
    path: AstPath<YulStatements>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return this.items.length === 0 && this.comments.length === 0
      ? ''
      : printSeparatedItem(
          [
            printPreservingEmptyLines(path, print, options),
            printComments(path)
          ],
          { firstSeparator: hardline, grouped: false }
        );
  }
}
