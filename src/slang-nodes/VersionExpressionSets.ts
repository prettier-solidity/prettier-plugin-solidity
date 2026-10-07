import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { SlangNode } from './SlangNode.ts';
import { VersionExpressionSet } from './VersionExpressionSet.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.js';

export class VersionExpressionSets extends SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSets;

  items: VersionExpressionSet[];

  constructor(ast: ast.VersionExpressionSets, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map(
      (item) => new VersionExpressionSet(item, collected)
    );
  }

  print(
    print: PrintFunction,
    path: AstPath<VersionExpressionSets>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      separator:
        options.experimentalOperatorPosition === 'end'
          ? [' ||', line]
          : [line, '|| ']
    });
  }
}
