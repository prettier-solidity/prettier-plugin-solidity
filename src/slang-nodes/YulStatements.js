import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { printComments } from '../slang-printers/print-comments.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { YulStatement } from './YulStatement.js';

const { hardline } = doc.builders;

export class YulStatements extends SlangNode {
  get kind() {
    return NonterminalKind.YulStatements;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      items: ast.items.map(
        (item, index) => new YulStatement(item, offsets[index], options)
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print, options) {
    return this.items.length === 0 &&
      (!this.comments || this.comments.length === 0)
      ? ''
      : printSeparatedItem(
          [
            printPreservingEmptyLines(path, 'items', options, print),
            printComments(this, path, options)
          ],
          {
            firstSeparator: hardline,
            grouped: false
          }
        );
  }
}
