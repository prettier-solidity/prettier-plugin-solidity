import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionExpressionSets } from './VersionExpressionSets.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

export class VersionPragma extends SlangNode {
  readonly kind = NonterminalKind.VersionPragma;

  sets: VersionExpressionSets;

  constructor(ast: ast.VersionPragma, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.sets = new VersionExpressionSets(ast.sets, options);

    this.updateMetadata(this.sets);
  }

  print(path: AstPath<VersionPragma>, print: PrintFunction): Doc {
    return ['solidity ', path.call(print, 'sets')];
  }
}
