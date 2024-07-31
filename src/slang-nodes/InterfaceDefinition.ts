import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { InterfaceMembers } from './InterfaceMembers.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const { group, line } = doc.builders;

export class InterfaceDefinition implements SlangNode {
  readonly kind = NonterminalKind.InterfaceDefinition;

  comments;

  loc;

  interfaceKeyword: string;

  name: string;

  inheritance?: InheritanceSpecifier;

  openBrace: string;

  members: InterfaceMembers;

  closeBrace: string;

  constructor(
    ast: ast.InterfaceDefinition,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.interfaceKeyword = ast.interfaceKeyword.text;
    this.name = ast.name.text;
    let i = 0;
    if (ast.inheritance) {
      this.inheritance = new InheritanceSpecifier(
        ast.inheritance,
        offsets[i],
        options
      );
      i += 1;
    }
    this.openBrace = ast.openBrace.text;
    this.members = new InterfaceMembers(ast.members, offsets[i], options);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.inheritance, this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
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
