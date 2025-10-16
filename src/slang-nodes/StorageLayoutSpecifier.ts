import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class StorageLayoutSpecifier extends SlangNode {
  readonly kind = NonterminalKind.StorageLayoutSpecifier;

  expression: Expression;

  constructor(
    ast: ast.StorageLayoutSpecifier,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.expression = new Expression(ast.expression, options);

    this.updateMetadata(this.expression);
  }

  print(path: AstPath<StorageLayoutSpecifier>, print: PrintFunction): Doc {
    return [
      'layout at',
      printSeparatedItem(path.call(printVariant(print), 'expression'), {
        firstSeparator: line,
        // If this is the second ContractSpecifier we have to delegate printing
        // the line to the ContractSpecifiers node.
        lastSeparator: path.isFirst ? line : ''
      })
    ];
  }
}
