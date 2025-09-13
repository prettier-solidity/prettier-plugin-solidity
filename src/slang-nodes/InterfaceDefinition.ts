import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { InterfaceMembers } from './InterfaceMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { group, line } = doc.builders;

export class InterfaceDefinition extends SlangNode {
  readonly kind = NonterminalKind.InterfaceDefinition;

  name: TerminalNode;

  inheritance?: InheritanceSpecifier;

  members: InterfaceMembers;

  constructor(ast: ast.InterfaceDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new TerminalNode(ast.name);
    if (ast.inheritance) {
      this.inheritance = new InheritanceSpecifier(ast.inheritance, options);
    }
    this.members = new InterfaceMembers(ast.members, options);

    this.updateMetadata(this.inheritance, this.members);
  }

  print(path: AstPath<InterfaceDefinition>, print: PrintFunction): Doc {
    return [
      group([
        'interface ',
        path.call(print, 'name'),
        this.inheritance ? [' ', path.call(print, 'inheritance')] : line,
        '{'
      ]),
      path.call(print, 'members'),
      '}'
    ];
  }
}
