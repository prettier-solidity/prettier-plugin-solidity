import { SlangNode } from './SlangNode.js';

export class YulDefaultCase extends SlangNode {
  defaultKeyword;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.defaultKeyword = ast.defaultKeyword.text;
    this.body = parse(ast.body, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [`${this.defaultKeyword} `, path.call(print, 'body')];
  }
}
