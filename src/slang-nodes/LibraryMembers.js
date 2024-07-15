import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class LibraryMembers extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print, options) {
    return this.items.length > 0
      ? printSeparatedItem(
          printPreservingEmptyLines(path, 'items', options, print),
          { firstSeparator: hardline, grouped: false }
        )
      : '';
  }
}
