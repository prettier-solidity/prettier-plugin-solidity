import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { TupleDeconstructionElement } from './TupleDeconstructionElement.js';

export class TupleDeconstructionElements extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new TupleDeconstructionElement(
            item,
            childrenOffsets.shift(),
            comments,
            options
          )
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'));
  }
}
