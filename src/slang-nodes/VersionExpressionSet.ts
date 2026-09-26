import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { join } from '../slang-printers/prettier-builders.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { VersionExpression } from './VersionExpression.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class VersionExpressionSet extends SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSet;

  items: VersionExpression['variant'][];

  constructor(ast: ast.VersionExpressionSet, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new VersionExpression(item, collected))
    );
  }

  print(print: PrintFunction, path: AstPath<VersionExpressionSet>): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
