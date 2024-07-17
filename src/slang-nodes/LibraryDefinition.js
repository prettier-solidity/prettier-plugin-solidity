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

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      libraryKeyword: ast.libraryKeyword.text,
      name: ast.name.text,
      openBrace: ast.openBrace.text,
      members: new LibraryMembers(
        ast.members,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      group([`${this.libraryKeyword} ${this.name}`, line, this.openBrace]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
