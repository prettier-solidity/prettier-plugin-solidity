import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { printSeparatedItem } from '../slang-printers/print-separated-item.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { Expression } from './Expression.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class StorageLayoutSpecifier extends SlangNode {
  readonly kind = NonterminalKind.StorageLayoutSpecifier;

  expression: Expression['variant'];

  constructor(ast: ast.StorageLayoutSpecifier, collected: CollectedMetadata) {
    super(ast, collected);

    this.expression = extractVariant(new Expression(ast.expression, collected));

    this.updateMetadata(this.expression);
  }

  print(print: PrintFunction, path: AstPath<StorageLayoutSpecifier>): Doc {
    return [
      'layout at',
      printSeparatedItem(print('expression'), {
        firstSeparator: line,
        // If this is the second ContractSpecifier we have to delegate printing
        // the line to the ContractSpecifiers node.
        lastSeparator: path.isFirst ? line : ''
      })
    ];
  }
}
