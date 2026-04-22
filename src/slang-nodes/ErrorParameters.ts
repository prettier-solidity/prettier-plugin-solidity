import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { ErrorParameter } from './ErrorParameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ErrorParameters extends NodeCollection<
  ast.ErrorParameters,
  ErrorParameter
> {
  readonly kind = NonterminalKind.ErrorParameters;

  constructor(ast: ast.ErrorParameters, collected: CollectedMetadata) {
    super(ast, collected, ErrorParameter);
  }

  print(print: PrintFunction, path: AstPath<ErrorParameters>): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
