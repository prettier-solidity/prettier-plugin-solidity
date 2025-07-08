import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UsingOperator } from './UsingOperator.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UsingAlias implements SlangNode {
  readonly kind = NonterminalKind.UsingAlias;

  comments;

  loc;

  operator: UsingOperator;

  constructor(ast: ast.UsingAlias) {
    const metadata = getNodeMetadata(ast);

    this.operator = new UsingOperator(ast.operator);

    [this.loc, this.comments] = updateMetadata(metadata, [this.operator]);
  }

  print(path: AstPath<UsingAlias>, print: PrintFunction): Doc {
    return [' as ', path.call(print, 'operator')];
  }
}
