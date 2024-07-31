import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulSwitchCase } from './YulSwitchCase.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const { hardline, join } = doc.builders;

export class YulSwitchCases implements SlangNode {
  readonly kind = NonterminalKind.YulSwitchCases;

  comments;

  loc;

  items: YulSwitchCase[];

  constructor(ast: ast.YulSwitchCases, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new YulSwitchCase(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
