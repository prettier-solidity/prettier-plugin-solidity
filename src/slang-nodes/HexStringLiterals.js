import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';

const { join, hardline } = doc.builders;

export class HexStringLiterals extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new HexStringLiteral(item, childrenOffsets.shift(), comments, options)
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
