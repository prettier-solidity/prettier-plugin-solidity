import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, line } = doc.builders;

export class LibraryDefinition extends SlangNode {
  libraryKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.libraryKeyword = ast.libraryKeyword.text;
    this.name = ast.name.text;
    this.openBrace = ast.openBrace.text;
    this.members = parse(ast.members, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      group([`${this.libraryKeyword} ${this.name}`, line, this.openBrace]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
