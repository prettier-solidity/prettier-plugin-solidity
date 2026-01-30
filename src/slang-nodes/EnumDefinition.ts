import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { EnumMembers } from './EnumMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class EnumDefinition extends SlangNode {
  readonly kind = NonterminalKind.EnumDefinition;

  name: TerminalNode;

  members: EnumMembers;

  constructor(ast: ast.EnumDefinition, collected: CollectedMetadata) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    this.members = new EnumMembers(ast.members, collected);

    this.updateMetadata(this.members);
  }

  print(path: AstPath<EnumDefinition>, print: PrintFunction): Doc {
    return [
      'enum ',
      path.call(print, 'name'),
      ' {',
      path.call(print, 'members'),
      '}'
    ];
  }
}
