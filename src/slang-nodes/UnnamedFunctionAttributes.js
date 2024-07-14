import { doc } from 'prettier';
import { sortFunctionAttributes } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class UnnamedFunctionAttributes extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.items = this.items.sort(sortFunctionAttributes);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
