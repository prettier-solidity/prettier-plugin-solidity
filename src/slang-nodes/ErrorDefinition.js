import { SlangNode } from './SlangNode.js';

export class ErrorDefinition extends SlangNode {
  errorKeyword;

  name;

  members;

  semicolon;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.errorKeyword = ast.errorKeyword.text;
    this.name = ast.name.text;
    this.members = parse(ast.members, parse, this.nextChildOffset);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      `${this.errorKeyword} ${this.name}`,
      path.call(print, 'members'),
      this.semicolon
    ];
  }
}
