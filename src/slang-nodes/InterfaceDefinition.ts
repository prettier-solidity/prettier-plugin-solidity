import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { InterfaceMembers } from './InterfaceMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { group, line } = doc.builders;

export class InterfaceDefinition extends SlangNode {
  readonly kind = NonterminalKind.InterfaceDefinition;

  name: TerminalNode;

  inheritance?: InheritanceSpecifier;

  members: InterfaceMembers;

  constructor(
    ast: ast.InterfaceDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    if (ast.inheritance) {
      this.inheritance = new InheritanceSpecifier(
        ast.inheritance,
        collected,
        options
      );
    }
    this.members = new InterfaceMembers(ast.members, collected, options);

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
