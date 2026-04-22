import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { NamedArguments } from './NamedArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class NamedArgumentGroup extends SlangNode {
  readonly kind = NonterminalKind.NamedArgumentGroup;

  arguments: NamedArguments;

  constructor(ast: ast.NamedArgumentGroup, collected: CollectedMetadata) {
    super(ast, collected);

    this.arguments = new NamedArguments(ast.arguments, collected);

    this.updateMetadata(this.arguments);
  }

  print(print: PrintFunction): Doc {
    return ['{', print('arguments'), '}'];
  }
}
