import { SlangNode } from './SlangNode.js';

export class TypeExpression extends SlangNode {
  typeKeyword;

  openParen;

  typeName;

  closeParen;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.typeKeyword = ast.typeKeyword.text;
    this.openParen = ast.openParen.text;
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print({ path, print, options }) {
    return ['TODO: TypeExpression'];
  }
}
