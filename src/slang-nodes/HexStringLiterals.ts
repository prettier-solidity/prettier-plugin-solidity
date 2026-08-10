import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { hardline, join } from '../slang-printers/prettier-builders.js';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class HexStringLiterals extends SlangNode {
  readonly kind = NonterminalKind.HexStringLiterals;

  items: HexStringLiteral[];

  constructor(ast: ast.HexStringLiterals, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new HexStringLiteral(item, collected));
  }

  print(print: PrintFunction, path: AstPath<HexStringLiterals>): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
