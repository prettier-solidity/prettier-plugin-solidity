import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { StructMembers } from './StructMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class StructDefinition extends SlangNode {
  readonly kind = NonterminalKind.StructDefinition;

  name: TerminalNode;

  members: StructMembers;

  constructor(
    ast: ast.StructDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    this.members = new StructMembers(ast.members, collected, options);

    this.updateMetadata(this.members);
  }

  print(print: PrintFunction): Doc {
    return ['struct ', print('name'), ' {', print('members'), '}'];
  }
}
