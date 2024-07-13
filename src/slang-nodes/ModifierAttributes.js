import { doc } from 'prettier';
import { sortFunctionAttributes } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class ModifierAttributes extends SlangNode {
  items;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.items = ast.items
      .map((item) => parse(item, parse, this.nextChildOffset))
      .sort(sortFunctionAttributes);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
