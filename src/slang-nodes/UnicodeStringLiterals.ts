import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { NodeCollection } from './NodeCollection.js';
import { UnicodeStringLiteral } from './UnicodeStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals extends NodeCollection<
  ast.UnicodeStringLiterals,
  UnicodeStringLiteral
> {
  readonly kind = NonterminalKind.UnicodeStringLiterals;

  constructor(ast: ast.UnicodeStringLiterals, collected: CollectedMetadata) {
    super(ast, collected, UnicodeStringLiteral);
  }

  print(print: PrintFunction, path: AstPath<UnicodeStringLiterals>): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
