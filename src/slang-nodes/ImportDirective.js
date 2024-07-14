import { SlangNode } from './SlangNode.js';

export class ImportDirective extends SlangNode {
  importKeyword;

  clause;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      `${this.importKeyword} `,
      path.call(print, 'clause'),
      this.semicolon
    ];
  }
}
