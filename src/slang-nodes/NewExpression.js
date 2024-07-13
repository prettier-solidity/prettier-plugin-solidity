import { SlangNode } from './SlangNode.js';

export class NewExpression extends SlangNode {
  newKeyword;

  typeName;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.newKeyword = ast.newKeyword.text;
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [`${this.newKeyword} `, path.call(print, 'typeName')];
  }
}
