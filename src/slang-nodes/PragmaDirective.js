import { SlangNode } from './SlangNode.js';
import { Pragma } from './Pragma.js';

export class PragmaDirective extends SlangNode {
  pragmaKeyword;

  pragma;

  semicolon;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.pragmaKeyword = ast.pragmaKeyword.text;
    this.pragma = new Pragma(ast.pragma, this.nextChildOffset, options, parse);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.pragmaKeyword} `,
      path.call(print, 'pragma'),
      this.semicolon
    ];
  }
}
