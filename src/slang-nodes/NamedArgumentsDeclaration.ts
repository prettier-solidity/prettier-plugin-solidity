import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { NamedArgumentGroup } from './NamedArgumentGroup.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class NamedArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.NamedArgumentsDeclaration;

  arguments?: NamedArgumentGroup;

  constructor(
    ast: ast.NamedArgumentsDeclaration,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    if (ast.arguments) {
      this.arguments = new NamedArgumentGroup(ast.arguments, collected);
    }

    this.updateMetadata(this.arguments);
  }

  print(print: PrintFunction): Doc {
    return ['(', print('arguments'), ')'];
  }
}
