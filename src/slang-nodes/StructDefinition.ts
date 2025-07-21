import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';
import { StructMembers } from './StructMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class StructDefinition extends SlangNode {
  readonly kind = NonterminalKind.StructDefinition;

  name: Identifier;

  members: StructMembers;

  constructor(ast: ast.StructDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new Identifier(ast.name);
    this.members = new StructMembers(ast.members, options);

    this.updateMetadata(this.members);
  }

  print(path: AstPath<StructDefinition>, print: PrintFunction): Doc {
    return [
      'struct ',
      path.call(print, 'name'),
      ' {',
      path.call(print, 'members'),
      '}'
    ];
  }
}
