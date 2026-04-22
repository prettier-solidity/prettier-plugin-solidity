import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join, hardline } = doc.builders;

export class StringLiterals extends SlangNode {
  readonly kind = NonterminalKind.StringLiterals;

  items: StringLiteral[];

  constructor(ast: ast.StringLiterals, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new StringLiteral(item, collected));
  }

  print(print: PrintFunction, path: AstPath<StringLiterals>): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
