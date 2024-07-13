import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { hardline } = doc.builders;

export class YulSwitchStatement extends SlangNode {
  switchKeyword;

  expression;

  cases;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.switchKeyword = ast.switchKeyword.text;
    this.expression = parse(ast.expression, parse, this.nextChildOffset);
    this.cases = parse(ast.cases, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      `${this.switchKeyword} `,
      path.call(print, 'expression'),
      hardline,
      path.call(print, 'cases')
    ];
  }
}
