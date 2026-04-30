import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

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
