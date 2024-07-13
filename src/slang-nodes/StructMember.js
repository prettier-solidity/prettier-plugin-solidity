import { SlangNode } from './SlangNode.js';

export class StructMember extends SlangNode {
  typeName;

  name;

  semicolon;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.name = ast.name.text;
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [path.call(print, 'typeName'), ` ${this.name}${this.semicolon}`];
  }
}
