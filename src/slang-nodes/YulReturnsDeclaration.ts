import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { printSeparatedItem } from '../slang-printers/print-separated-item.ts';
import { SlangNode } from './SlangNode.ts';
import { YulVariableNames } from './YulVariableNames.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulReturnsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.YulReturnsDeclaration;

  variables: YulVariableNames;

  constructor(ast: ast.YulReturnsDeclaration, collected: CollectedMetadata) {
    super(ast, collected);

    this.variables = new YulVariableNames(ast.variables, collected);

    this.updateMetadata(this.variables);
  }

  print(print: PrintFunction): Doc {
    return printSeparatedItem(['->', print('variables')], {
      firstSeparator: line
    });
  }
}
