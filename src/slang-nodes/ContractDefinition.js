import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, line } = doc.builders;

export class ContractDefinition extends SlangNode {
  abstractKeyword;

  contractKeyword;

  name;

  inheritance;

  openBrace;

  members;

  closeBrace;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.abstractKeyword = ast.abstractKeyword?.text;
    this.contractKeyword = ast.contractKeyword.text;
    this.name = ast.name.text;
    this.inheritance = ast.inheritance
      ? parse(ast.inheritance, parse, this.nextChildOffset)
      : undefined;
    this.openBrace = ast.openBrace.text;
    this.members = parse(ast.members, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      group([
        `${this.abstractKeyword ? `${this.abstractKeyword} ` : ''}${this.contractKeyword} ${this.name}`,
        this.inheritance ? [' ', path.call(print, 'inheritance')] : line,
        this.openBrace
      ]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
