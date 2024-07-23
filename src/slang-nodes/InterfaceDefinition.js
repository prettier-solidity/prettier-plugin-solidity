import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { InterfaceMembers } from './InterfaceMembers.js';

const { group, line } = doc.builders;

export class InterfaceDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.InterfaceDefinition;
  }

  interfaceKeyword;

  name;

  inheritance;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = -1;
      const children = {
        interfaceKeyword: ast.interfaceKeyword.text,
        name: ast.name.text,
        inheritance: ast.inheritance
          ? new InheritanceSpecifier(
              ast.inheritance,
              offsets[(i += 1)],
              options
            )
          : undefined,
        openBrace: ast.openBrace.text,
        members: new InterfaceMembers(ast.members, offsets[(i += 1)], options),
        closeBrace: ast.closeBrace.text
      };
      return children;
    };

    this.initialize(ast, offset, fetch);
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
