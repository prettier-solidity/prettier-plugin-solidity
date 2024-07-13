import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, line } = doc.builders;

export class InterfaceDefinition extends SlangNode {
  interfaceKeyword;

  name;

  inheritance;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.interfaceKeyword = ast.interfaceKeyword.text;
    this.name = ast.name.text;
    this.inheritance = ast.inheritence
      ? parse(ast.inheritance, parse, this.nextChildOffset)
      : undefined;
    this.openBrace = ast.openBrace.text;
    this.members = parse(ast.members, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      group([
        `${this.interfaceKeyword} ${this.name}`,
        this.inheritance ? path.call(print, 'inheritance') : line,
        this.openBrace
      ]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
