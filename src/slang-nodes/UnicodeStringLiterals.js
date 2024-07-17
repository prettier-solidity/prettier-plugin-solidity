import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { UnicodeStringLiteral } from './UnicodeStringLiteral.js';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new UnicodeStringLiteral(
            item,
            childrenOffsets.shift(),
            comments,
            options
          )
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
