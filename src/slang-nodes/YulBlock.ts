import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulStatements } from './YulStatements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulBlock extends SlangNode {
  readonly kind = NonterminalKind.YulBlock;

  statements: YulStatements;

  constructor(ast: ast.YulBlock, collected: CollectedMetadata) {
    super(ast, collected);

    this.statements = new YulStatements(ast.statements, collected);

    this.updateMetadata(this.statements);
  }

  print(print: PrintFunction): Doc {
    return ['{', print('statements'), '}'];
  }
}
