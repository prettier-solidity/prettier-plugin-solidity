import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulSwitchCase } from './YulSwitchCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { hardline, join } = doc.builders;

export class YulSwitchCases extends SlangNode {
  readonly kind = NonterminalKind.YulSwitchCases;

  items: YulSwitchCase['variant'][];

  constructor(
    ast: ast.YulSwitchCases,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new YulSwitchCase(item, collected, options))
    );
  }

  print(path: AstPath<YulSwitchCases>, print: PrintFunction): Doc {
    return join(hardline, path.map(print, 'items'));
  }
}
