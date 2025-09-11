import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { UnicodeStringLiteral } from './UnicodeStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals extends SlangNode {
  readonly kind = NonterminalKind.UnicodeStringLiterals;

  items: UnicodeStringLiteral[];

  constructor(ast: ast.UnicodeStringLiterals, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map(
      (item) => new UnicodeStringLiteral(item, options)
    );
  }

  print(path: AstPath<UnicodeStringLiterals>, print: PrintFunction): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
