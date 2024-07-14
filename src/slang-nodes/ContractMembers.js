import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import {
  printComments,
  printPreservingEmptyLines
} from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class ContractMembers extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
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
          { firstSeparator: hardline, grouped: false }
        );
  }
}
