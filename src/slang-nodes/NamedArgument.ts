import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class NamedArgument extends SlangNode {
  readonly kind = NonterminalKind.NamedArgument;

  name: TerminalNode;

  value: Expression['variant'];

  constructor(ast: ast.NamedArgument, collected: CollectedMetadata) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    this.value = extractVariant(new Expression(ast.value, collected));

    this.updateMetadata(this.value);
  }

  print(print: PrintFunction): Doc {
    return [print('name'), ': ', print('value')];
  }
}
