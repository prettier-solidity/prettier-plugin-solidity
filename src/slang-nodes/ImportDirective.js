import { SlangNode } from './SlangNode.js';

export class ImportDirective extends SlangNode {
  importKeyword;

  clause;

  semicolon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.importKeyword = ast.importKeyword.text;
    this.clause = parse(ast.clause, parse, this.nextChildOffset);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      `${this.importKeyword} `,
      path.call(print, 'clause'),
      this.semicolon
    ];
  }
}
