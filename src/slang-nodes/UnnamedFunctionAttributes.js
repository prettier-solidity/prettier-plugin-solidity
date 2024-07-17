import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.js';

const { line } = doc.builders;

export class UnnamedFunctionAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new UnnamedFunctionAttribute(
            item,
            childrenOffsets.shift(),
            comments,
            options
          )
      );
    };

    this.initialize(ast, offset, comments, fetch);

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
