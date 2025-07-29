import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { VersionOperator } from './VersionOperator.js';
import { VersionLiteral } from './VersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class VersionTerm extends SlangNode {
  readonly kind = NonterminalKind.VersionTerm;

  operator?: VersionOperator;

  literal: VersionLiteral;

  constructor(ast: ast.VersionTerm) {
    super(ast);

    if (ast.operator) {
      this.operator = new VersionOperator(ast.operator);
    }
    this.literal = new VersionLiteral(ast.literal);

    this.updateMetadata(this.operator, this.literal);
  }

  print(path: AstPath<VersionTerm>, print: PrintFunction): Doc {
    return [
      path.call(print, 'operator'),
      path.call(printVariant(print), 'literal')
    ];
  }
}
