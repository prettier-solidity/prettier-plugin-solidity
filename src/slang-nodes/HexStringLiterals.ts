import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { HexStringLiteral } from './HexStringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

const { join, hardline } = doc.builders;

export class HexStringLiterals implements SlangNode {
  readonly kind = NonterminalKind.HexStringLiterals;

  comments;

  loc;

  items: HexStringLiteral[];

  constructor(
    ast: ast.HexStringLiterals,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new HexStringLiteral(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<HexStringLiterals>, print: PrintFunction): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
