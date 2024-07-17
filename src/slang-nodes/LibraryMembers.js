import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { ContractMember } from './ContractMember.js';

const { hardline } = doc.builders;

export class LibraryMembers extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new ContractMember(item, childrenOffsets.shift(), comments, options)
      )
    });

    this.initialize(ast, offset, fetch, comments);
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
