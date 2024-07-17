import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';

const { join, hardline } = doc.builders;

export class StringLiterals extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new StringLiteral(item, childrenOffsets.shift(), comments, options)
      );
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
