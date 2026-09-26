import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { YulExpression } from './YulExpression.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulArguments extends SlangNode {
  readonly kind = NonterminalKind.YulArguments;

  items: YulExpression['variant'][];

  constructor(ast: ast.YulArguments, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new YulExpression(item, collected))
    );
  }

  print(print: PrintFunction, path: AstPath<YulArguments>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
