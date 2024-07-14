import { SlangNode } from './SlangNode.js';

export class PragmaDirective extends SlangNode {
  pragmaKeyword;

  pragma;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      `${this.pragmaKeyword} `,
      path.call(print, 'pragma'),
      this.semicolon
    ];
  }
}
