import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { join, hardline } = doc.builders;

export class HexStringLiterals extends SlangNode {
  readonly kind = NonterminalKind.HexStringLiterals;

  items: HexStringLiteral[];

  constructor(ast: ast.HexStringLiterals, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new HexStringLiteral(item, options));
  }

  print(path: AstPath<HexStringLiterals>, print: PrintFunction): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
