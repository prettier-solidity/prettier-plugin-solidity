import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { FunctionTypeAttribute } from './FunctionTypeAttribute.js';

const { line } = doc.builders;

export class FunctionTypeAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new FunctionTypeAttribute(
            item,
            childrenOffsets.shift(),
            comments,
            options
          )
      )
    });

    this.initialize(ast, offset, fetch, comments);

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
