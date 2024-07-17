import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { printComments } from '../slang-printers/print-comments.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { YulStatement } from './YulStatement.js';

const { hardline } = doc.builders;

export class YulStatements extends SlangNode {
  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) => new YulStatement(item, childrenOffsets.shift(), options)
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
