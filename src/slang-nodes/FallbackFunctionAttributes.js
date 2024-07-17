import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { FallbackFunctionAttribute } from './FallbackFunctionAttribute.js';

const { line } = doc.builders;

export class FallbackFunctionAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new FallbackFunctionAttribute(
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
