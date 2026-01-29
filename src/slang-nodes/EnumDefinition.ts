import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { EnumMembers } from './EnumMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class EnumDefinition extends SlangNode {
  readonly kind = NonterminalKind.EnumDefinition;

  name: TerminalNode;

  members: EnumMembers;

  constructor(ast: ast.EnumDefinition, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.name = new TerminalNode(ast.name, options);
    this.members = new EnumMembers(ast.members, options);

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
