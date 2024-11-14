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
    let metadata = getNodeMetadata(ast);

    this.operator = new UsingOperator(ast.operator);

    metadata = updateMetadata(metadata, [this.operator]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<UsingAlias>, print: PrintFunction): Doc {
    return [' as ', path.call(print, 'operator')];
  }
}
