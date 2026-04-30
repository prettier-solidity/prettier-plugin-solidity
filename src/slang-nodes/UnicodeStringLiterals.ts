import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { UnicodeStringLiteral } from './UnicodeStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals extends SlangNode {
  readonly kind = NonterminalKind.UnicodeStringLiterals;

  items: UnicodeStringLiteral[];

  constructor(ast: ast.UnicodeStringLiterals, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map(
      (item) => new UnicodeStringLiteral(item, collected)
    );
  }

  print(print: PrintFunction, path: AstPath<UnicodeStringLiterals>): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
