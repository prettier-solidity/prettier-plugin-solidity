import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { EnumMembers } from './EnumMembers.js';

export class EnumDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.EnumDefinition;
  }

  enumKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      enumKeyword: ast.enumKeyword.text,
      name: ast.name.text,
      openBrace: ast.openBrace.text,
      members: new EnumMembers(ast.members, offsets[0], options),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.enumKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
