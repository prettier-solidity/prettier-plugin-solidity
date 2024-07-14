import { SlangNode } from './SlangNode.js';

export class YulValueCase extends SlangNode {
  caseKeyword;

  value;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.caseKeyword = ast.caseKeyword.text;
    this.value = parse(ast.value, this.nextChildOffset);
    this.body = parse(ast.body, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.caseKeyword} `,
      path.call(print, 'value'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
