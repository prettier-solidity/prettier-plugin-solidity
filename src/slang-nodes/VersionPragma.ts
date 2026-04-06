import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionExpressionSets } from './VersionExpressionSets.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class VersionPragma extends SlangNode {
  readonly kind = NonterminalKind.VersionPragma;

  sets: VersionExpressionSets;

  constructor(ast: ast.VersionPragma, collected: CollectedMetadata) {
    super(ast, collected);

    this.sets = new VersionExpressionSets(ast.sets, collected);

    this.updateMetadata(this.sets);
  }

  print(print: PrintFunction): Doc {
    return ['solidity ', print('sets')];
  }
}
