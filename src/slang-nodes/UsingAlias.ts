import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { UsingOperator } from './UsingOperator.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class UsingAlias extends SlangNode {
  readonly kind = NonterminalKind.UsingAlias;

  operator: UsingOperator;

  constructor(ast: ast.UsingAlias) {
    super(ast);

    this.operator = new UsingOperator(ast.operator);

    this.updateMetadata(this.operator);
  }

  print(path: AstPath<UsingAlias>, print: PrintFunction): Doc {
    return [' as ', path.call(print, 'operator')];
  }
}
