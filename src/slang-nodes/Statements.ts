import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { hardline } = doc.builders;

export class Statements implements SlangNode {
  readonly kind = NonterminalKind.Statements;

  comments;

  loc;

  items: Statement[];

  constructor(ast: ast.Statements, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new Statement(item, options));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<Statements>,
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
