const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class VersionExpressionSet extends SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSet;

  items: VersionExpression[];

  constructor(ast: ast.VersionExpressionSet) {
    super(ast, true);

    this.items = ast.items.map((item) => new VersionExpression(item));

    this.updateMetadata(this.items);
  }

  print(path: AstPath<VersionExpressionSet>, print: PrintFunction): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
