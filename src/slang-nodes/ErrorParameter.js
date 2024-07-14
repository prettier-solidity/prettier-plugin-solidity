import { SlangNode } from './SlangNode.js';

export class ErrorParameter extends SlangNode {
  errorKeyword;

  name;

  members;

  semicolon;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, this.nextChildOffset);
    this.name = ast.name?.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), this.name ? ` ${this.name}` : ''];
  }
}
