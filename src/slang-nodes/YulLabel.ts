import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { dedent, line } from '../slang-printers/prettier-builders.ts';
import { SlangNode } from './SlangNode.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulLabel extends SlangNode {
  readonly kind = NonterminalKind.YulLabel;

  label: TerminalNode;

  constructor(ast: ast.YulLabel, collected: CollectedMetadata) {
    super(ast, collected);

    this.label = new TerminalNode(ast.label, collected);
  }

  print(print: PrintFunction): Doc {
    return [dedent(line), print('label'), ':'];
  }
}
