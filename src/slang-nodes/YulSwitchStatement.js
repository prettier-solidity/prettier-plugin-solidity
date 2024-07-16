import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class YulSwitchStatement extends SlangNode {
  switchKeyword;

  expression;

  cases;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      `${this.switchKeyword} `,
      path.call(print, 'expression'),
      hardline,
      path.call(print, 'cases')
    ];
  }
}
