import { SlangNode } from './SlangNode.js';

export class YulVariableDeclarationStatement extends SlangNode {
  letKeyword;

  names;

  value;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.letKeyword = ast.letKeyword.text;
    this.names = ast.names.text;
    if (ast.value) {
      this.value = parse(ast.value, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.letKeyword} ${this.names} `,
      this.value ? path.call(print, 'value') : ''
    ];
  }
}
