import { SlangNode } from './SlangNode.js';

export class NewExpression extends SlangNode {
  newKeyword;

  typeName;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [`${this.newKeyword} `, path.call(print, 'typeName')];
  }
}
