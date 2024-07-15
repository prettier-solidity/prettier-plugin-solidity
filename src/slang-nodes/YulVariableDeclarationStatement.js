import { SlangNode } from './SlangNode.js';

export class YulVariableDeclarationStatement extends SlangNode {
  letKeyword;

  names;

  value;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      `${this.letKeyword} ${this.names} `,
      this.value ? path.call(print, 'value') : ''
    ];
  }
}
