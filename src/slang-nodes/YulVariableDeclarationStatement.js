import { SlangNode } from './SlangNode.js';

export class YulVariableDeclarationStatement extends SlangNode {
  letKeyword;

  names;

  value;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      `${this.letKeyword} ${this.names} `,
      this.value ? path.call(print, 'value') : ''
    ];
  }
}
