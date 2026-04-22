import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { VariantCollection } from './VariantCollection.js';
import { VersionExpression } from './VersionExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class VersionExpressionSet extends VariantCollection<
  ast.VersionExpressionSet,
  VersionExpression
> {
  readonly kind = NonterminalKind.VersionExpressionSet;

  constructor(ast: ast.VersionExpressionSet, collected: CollectedMetadata) {
    super(ast, collected, VersionExpression);
  }

  print(print: PrintFunction, path: AstPath<VersionExpressionSet>): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
