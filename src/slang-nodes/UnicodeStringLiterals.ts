import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UnicodeStringLiteral } from './UnicodeStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals implements SlangNode {
  readonly kind = NonterminalKind.UnicodeStringLiterals;

  comments;

  loc;

  items: UnicodeStringLiteral[];

  constructor(ast: ast.UnicodeStringLiterals, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map(
      (item) => new UnicodeStringLiteral(item, options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<UnicodeStringLiterals>, print: PrintFunction): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
