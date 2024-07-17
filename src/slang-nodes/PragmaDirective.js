import { SlangNode } from './SlangNode.js';
import { Pragma } from './Pragma.js';

export class PragmaDirective extends SlangNode {
  pragmaKeyword;

  pragma;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      pragmaKeyword: ast.pragmaKeyword.text,
      pragma: new Pragma(ast.pragma, childrenOffsets.shift(), options),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.pragmaKeyword} `,
      path.call(print, 'pragma'),
      this.semicolon
    ];
  }
}
