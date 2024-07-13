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

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.items = ast.items.map((item) =>
      parse(item, parse, this.nextChildOffset)
    );
    this.initiateLoc(ast);
  }

  print({ options, path, print }) {
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
