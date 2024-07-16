import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class FallbackFunctionAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
