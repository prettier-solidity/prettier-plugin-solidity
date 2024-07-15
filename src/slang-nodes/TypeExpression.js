import { SlangNode } from './SlangNode.js';

export class TypeExpression extends SlangNode {
  typeKeyword;

  openParen;

  typeName;

  closeParen;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: TypeExpression'];
  }
}
