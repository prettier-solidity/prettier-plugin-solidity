import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulStatement } from './YulStatement.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const { hardline } = doc.builders;

export class YulStatements implements SlangNode {
  readonly kind = NonterminalKind.YulStatements;

  comments;

  loc;

  items: YulStatement[];

  constructor(ast: ast.YulStatements, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new YulStatement(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  ): Doc {
    return this.items.length === 0 &&
      (!this.comments || this.comments.length === 0)
      ? ''
      : printSeparatedItem(
          [
            printPreservingEmptyLines(path, 'items', print, options),
            printComments(this, path)
          ],
          {
            firstSeparator: hardline,
            grouped: false
          }
        );
  }
}
