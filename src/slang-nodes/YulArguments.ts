import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { VariantCollection } from './VariantCollection.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulArguments extends VariantCollection<
  ast.YulArguments,
  YulExpression
> {
  readonly kind = NonterminalKind.YulArguments;

  constructor(ast: ast.YulArguments, collected: CollectedMetadata) {
    super(ast, collected, YulExpression);
  }

  print(print: PrintFunction, path: AstPath<YulArguments>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
