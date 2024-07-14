import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class StructMembers extends SlangNode {
  items;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.items = ast.items.map((item) => parse(item, this.nextChildOffset));
    this.initiateLoc(ast);
  }

  print(path, print) {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'), {
          firstSeparator: hardline,
          separator: hardline
        })
      : '';
  }
}
