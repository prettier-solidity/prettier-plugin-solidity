import { SlangNode } from './SlangNode.js';

export class NamedImport extends SlangNode {
  asterisk;

  alias;

  fromKeyword;

  path;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.asterisk = ast.asterisk.text;
    this.alias = parse(ast.alias, this.nextChildOffset);
    this.fromKeyword = ast.fromKeyword.text;
    this.path = parse(ast.path, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      this.asterisk,
      path.call(print, 'alias'),
      ` ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
