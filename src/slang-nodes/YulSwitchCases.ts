import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulSwitchCase } from './YulSwitchCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { hardline, join } = doc.builders;

export class YulSwitchCases extends SlangNode {
  readonly kind = NonterminalKind.YulSwitchCases;

  items: YulSwitchCase[];

  constructor(ast: ast.YulSwitchCases, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new YulSwitchCase(item, options));

    this.updateMetadata([this.items]);
  }

  print(path: AstPath<YulSwitchCases>, print: PrintFunction): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
