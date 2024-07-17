import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class EnumMembers extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { items, separators } = ast;
      this.items = items.map((item) => item.text);
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print() {
    return printSeparatedList(this.items, { firstSeparator: hardline });
  }
}
