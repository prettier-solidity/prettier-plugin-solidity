import { SlangNode } from './SlangNode.js';

export class YulValueCase extends SlangNode {
  caseKeyword;

  value;

  body;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.caseKeyword = ast.caseKeyword.text;
    this.value = parse(ast.value, parse, this.nextChildOffset);
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      `${this.caseKeyword} `,
      path.call(print, 'value'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
