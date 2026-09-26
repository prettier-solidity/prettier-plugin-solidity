import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { group, line } from '../slang-printers/prettier-builders.ts';
import { SlangNode } from './SlangNode.ts';
import { TerminalNode } from './TerminalNode.ts';
import { InheritanceSpecifier } from './InheritanceSpecifier.ts';
import { InterfaceMembers } from './InterfaceMembers.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class InterfaceDefinition extends SlangNode {
  readonly kind = NonterminalKind.InterfaceDefinition;

  name: TerminalNode;

  inheritance?: InheritanceSpecifier;

  members: InterfaceMembers;

  constructor(ast: ast.InterfaceDefinition, collected: CollectedMetadata) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    if (ast.inheritance) {
      this.inheritance = new InheritanceSpecifier(ast.inheritance, collected);
    }
    this.members = new InterfaceMembers(ast.members, collected);

    this.updateMetadata(this.inheritance, this.members);
  }

  print(print: PrintFunction): Doc {
    return [
      'interface ',
      group([
        print('name'),
        this.inheritance ? [' ', print('inheritance')] : line,
        '{'
      ]),
      print('members'),
      '}'
    ];
  }
}
