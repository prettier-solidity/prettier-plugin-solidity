import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { NodeCollection } from './NodeCollection.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join, hardline } = doc.builders;

export class StringLiterals extends NodeCollection<
  ast.StringLiterals,
  StringLiteral
> {
  readonly kind = NonterminalKind.StringLiterals;

  constructor(ast: ast.StringLiterals, collected: CollectedMetadata) {
    super(ast, collected, StringLiteral);
  }

  print(print: PrintFunction, path: AstPath<StringLiterals>): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
