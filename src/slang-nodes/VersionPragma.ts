import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionExpressionSets } from './VersionExpressionSets.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class VersionPragma extends SlangNode {
  readonly kind = NonterminalKind.VersionPragma;

  sets: VersionExpressionSets;

  constructor(ast: ast.VersionPragma) {
    super(ast);

    this.sets = new VersionExpressionSets(ast.sets);

    this.updateMetadata(this.sets);
  }

  print(path: AstPath<VersionPragma>, print: PrintFunction): Doc {
    return ['solidity ', path.call(print, 'sets')];
  }
}
