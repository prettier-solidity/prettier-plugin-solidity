import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { printPreservingEmptyLines } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class LibraryMembers extends SlangNode {
  items;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.items = ast.items.map((item) =>
      parse(item, parse, this.nextChildOffset)
    );
    this.initiateLoc(ast);
  }

  print({ path, print, options }) {
    return this.items.length > 0
      ? printSeparatedItem(
          printPreservingEmptyLines(path, 'items', options, print),
          { firstSeparator: hardline, grouped: false }
        )
      : '';
  }
}
