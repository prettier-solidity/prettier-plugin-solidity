import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { InheritanceType } from './InheritanceType.js';

const { line } = doc.builders;

export class InheritanceTypes extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new InheritanceType(item, childrenOffsets.shift(), comments, options)
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line
    });
  }
}
