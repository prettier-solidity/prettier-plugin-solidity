import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { LibraryMembers } from './LibraryMembers.js';

const { group, line } = doc.builders;

export class LibraryDefinition extends SlangNode {
  libraryKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { libraryKeyword, name, openBrace, members, closeBrace } = ast;
      this.libraryKeyword = libraryKeyword.text;
      this.name = name.text;
      this.openBrace = openBrace.text;
      this.members = new LibraryMembers(
        members,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.closeBrace = closeBrace.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [
      group([`${this.libraryKeyword} ${this.name}`, line, this.openBrace]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
