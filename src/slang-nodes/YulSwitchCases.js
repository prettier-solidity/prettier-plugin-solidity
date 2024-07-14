import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { hardline, join } = doc.builders;

export class YulSwitchCases extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
