import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';
import { YulVariableNames } from './YulVariableNames.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class YulVariableDeclarationStatement extends SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationStatement;

  variables: YulVariableNames;

  value?: YulVariableDeclarationValue;

  constructor(
    ast: ast.YulVariableDeclarationStatement,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.variables = new YulVariableNames(ast.variables, collected);
    if (ast.value) {
      this.value = new YulVariableDeclarationValue(
        ast.value,
        collected,
        options
      );
    }

    this.updateMetadata(this.value);
  }

  print(print: PrintFunction): Doc {
    const valueDoc = print('value');
    return ['let', print('variables'), valueDoc ? [' ', valueDoc] : valueDoc];
  }
}
