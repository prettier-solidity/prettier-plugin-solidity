import { SlangNode } from './SlangNode.js';
import { StructMembers } from './StructMembers.js';

export class StructDefinition extends SlangNode {
  structKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { structKeyword, name, openBrace, members, closeBrace } = ast;
      this.structKeyword = structKeyword.text;
      this.name = name.text;
      this.openBrace = openBrace.text;
      this.members = new StructMembers(
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
      `${this.structKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
