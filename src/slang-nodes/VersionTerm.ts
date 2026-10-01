import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { VersionOperator } from './VersionOperator.ts';
import { VersionLiteral } from './VersionLiteral.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class VersionTerm extends SlangNode {
  readonly kind = NonterminalKind.VersionTerm;

  operator?: VersionOperator;

  literal: VersionLiteral['variant'];

  constructor(ast: ast.VersionTerm, collected: CollectedMetadata) {
    super(ast, collected);

    if (ast.operator) {
      this.operator = new VersionOperator(ast.operator, collected);
    }
    this.literal = extractVariant(new VersionLiteral(ast.literal, collected));

    this.updateMetadata(this.operator, this.literal);
  }

  print(print: PrintFunction): Doc {
    return [print('operator'), print('literal')];
  }
}
