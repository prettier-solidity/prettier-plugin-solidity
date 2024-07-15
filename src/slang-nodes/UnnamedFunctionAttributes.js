import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class UnnamedFunctionAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.items = this.items.sort(sortFunctionAttributes);
    this.finalize(ast);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
