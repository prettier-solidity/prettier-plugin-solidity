import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { InterfaceMembers } from './InterfaceMembers.js';

const { group, line } = doc.builders;

export class InterfaceDefinition extends SlangNode {
  interfaceKeyword;

  name;

  inheritance;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      interfaceKeyword: ast.interfaceKeyword.text,
      name: ast.name.text,
      inheritance: ast.inheritance
        ? new InheritanceSpecifier(
            ast.inheritance,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      openBrace: ast.openBrace.text,
      members: new InterfaceMembers(
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
      group([
        `${this.interfaceKeyword} ${this.name}`,
        this.inheritance ? path.call(print, 'inheritance') : line,
        this.openBrace
      ]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
