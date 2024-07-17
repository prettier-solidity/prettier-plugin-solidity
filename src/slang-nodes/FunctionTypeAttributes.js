import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { FunctionTypeAttribute } from './FunctionTypeAttribute.js';

const { line } = doc.builders;

export class FunctionTypeAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new FunctionTypeAttribute(
            item,
            childrenOffsets.shift(),
            comments,
            parse,
            options
          )
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
