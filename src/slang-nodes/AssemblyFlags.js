import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';

export class AssemblyFlags extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items, separators } = ast;
      this.items = items.map(
        (item) =>
          new StringLiteral(
            item,
            childrenOffsets.shift(),
            comments,
            parse,
            options
          )
      );
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'));
  }
}
