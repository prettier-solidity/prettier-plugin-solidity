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

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const {
        interfaceKeyword,
        name,
        inheritance,
        openBrace,
        members,
        closeBrace
      } = ast;
      this.interfaceKeyword = interfaceKeyword.text;
      this.name = name.text;
      if (inheritance) {
        this.inheritance = new InheritanceSpecifier(
          inheritance,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.openBrace = openBrace.text;
      this.members = new InterfaceMembers(
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
