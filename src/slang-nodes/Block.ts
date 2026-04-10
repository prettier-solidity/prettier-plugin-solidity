import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Statements } from './Statements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class Block extends SlangNode {
  readonly kind = NonterminalKind.Block;

  statements: Statements;

  constructor(
    ast: ast.Block,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.statements = new Statements(ast.statements, collected, options);

    this.updateMetadata(this.statements);
  }

  print(print: PrintFunction): Doc {
    return ['{', print('statements'), '}'];
  }
}
