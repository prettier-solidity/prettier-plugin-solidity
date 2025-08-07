import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { EnumMembers } from './EnumMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class EnumDefinition extends SlangNode {
  readonly kind = NonterminalKind.EnumDefinition;

  name: TerminalNode;

  members: EnumMembers;

  constructor(ast: ast.EnumDefinition) {
    super(ast);

    this.name = new TerminalNode(ast.name);
    this.members = new EnumMembers(ast.members);

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
