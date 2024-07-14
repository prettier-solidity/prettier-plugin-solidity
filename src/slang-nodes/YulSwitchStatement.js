import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class YulSwitchStatement extends SlangNode {
  switchKeyword;

  expression;

  cases;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.switchKeyword = ast.switchKeyword.text;
    this.expression = parse(ast.expression, this.nextChildOffset);
    this.cases = parse(ast.cases, this.nextChildOffset);
    this.initiateLoc(ast);
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
