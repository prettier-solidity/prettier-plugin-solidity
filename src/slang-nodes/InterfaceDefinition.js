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

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
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
