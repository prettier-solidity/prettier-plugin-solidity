import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { UsingClause } from './UsingClause.ts';
import { UsingTarget } from './UsingTarget.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class UsingDirective extends SlangNode {
  readonly kind = NonterminalKind.UsingDirective;

  clause: UsingClause['variant'];

  target: UsingTarget['variant'];

  globalKeyword?: string;

  constructor(ast: ast.UsingDirective, collected: CollectedMetadata) {
    super(ast, collected);

    this.clause = extractVariant(new UsingClause(ast.clause, collected));
    this.target = extractVariant(new UsingTarget(ast.target, collected));
    this.globalKeyword = ast.globalKeyword?.unparse();

    this.updateMetadata(this.clause, this.target);
  }

  print(print: PrintFunction): Doc {
    return [
      'using ',
      print('clause'),
      ' for ',
      print('target'),
      this.globalKeyword ? ' global;' : ';'
    ];
  }
}
