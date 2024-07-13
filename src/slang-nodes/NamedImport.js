import { SlangNode } from './SlangNode.js';

export class NamedImport extends SlangNode {
  asterisk;

  alias;

  fromKeyword;

  path;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.asterisk = ast.asterisk.text;
    this.alias = parse(ast.alias, parse, this.nextChildOffset);
    this.fromKeyword = ast.fromKeyword.text;
    this.path = parse(ast.path, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      this.asterisk,
      path.call(print, 'alias'),
      ` ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
