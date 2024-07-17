import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { StructMember } from './StructMember.js';

const { hardline } = doc.builders;

export class StructMembers extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new StructMember(item, childrenOffsets.shift(), comments, options)
      );
    };

    this.initialize(ast, offset, comments, fetch);
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
