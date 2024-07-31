import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UnicodeStringLiteral } from './UnicodeStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals implements SlangNode {
  readonly kind = NonterminalKind.UnicodeStringLiterals;

  comments;

  loc;

  items: UnicodeStringLiteral[];

  constructor(
    ast: ast.UnicodeStringLiterals,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new UnicodeStringLiteral(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
