import { SlangNode } from './SlangNode.js';

export class ConstantDefinition extends SlangNode {
  typeName;

  constantKeyword;

  name;

  equal;

  value;

  semicolon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.constantKeyword = ast.constantKeyword.text;
    this.name = ast.name.text;
    this.equal = ast.equal.text;
    this.value = parse(ast.value, parse, this.nextChildOffset);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print({ path, print, options }) {
    return ['TODO: ConstantDefinition'];
  }
}
