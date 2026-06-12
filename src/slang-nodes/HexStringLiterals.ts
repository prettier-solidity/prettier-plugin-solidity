import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { NodeCollection } from './NodeCollection.js';
import { HexStringLiteral } from './HexStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join, hardline } = doc.builders;

export class HexStringLiterals extends NodeCollection<
  ast.HexStringLiterals,
  HexStringLiteral
> {
  readonly kind = NonterminalKind.HexStringLiterals;

  constructor(ast: ast.HexStringLiterals, collected: CollectedMetadata) {
    super(ast, collected, HexStringLiteral);
  }

  print(print: PrintFunction, path: AstPath<HexStringLiterals>): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
