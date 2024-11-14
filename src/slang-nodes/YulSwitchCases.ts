import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulSwitchCase } from './YulSwitchCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { hardline, join } = doc.builders;

export class YulSwitchCases implements SlangNode {
  readonly kind = NonterminalKind.YulSwitchCases;

  comments;

  loc;

  items: YulSwitchCase[];

  constructor(ast: ast.YulSwitchCases, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new YulSwitchCase(item, options));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulSwitchCases>, print: PrintFunction): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
