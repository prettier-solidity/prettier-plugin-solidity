import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulSwitchCases } from './YulSwitchCases.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class YulSwitchStatement extends SlangNode {
  readonly kind = NonterminalKind.YulSwitchStatement;

  expression: YulExpression['variant'];

  cases: YulSwitchCases;

  constructor(ast: ast.YulSwitchStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.expression = extractVariant(
      new YulExpression(ast.expression, collected)
    );
    this.cases = new YulSwitchCases(ast.cases, collected);

    this.updateMetadata(this.expression, this.cases);
  }

  print(print: PrintFunction): Doc {
    return ['switch ', print('expression'), hardline, print('cases')];
  }
}
