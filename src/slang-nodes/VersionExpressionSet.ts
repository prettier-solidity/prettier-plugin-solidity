import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

const { join } = doc.builders;

export class VersionExpressionSet extends SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSet;

  items: VersionExpression['variant'][];

  constructor(ast: ast.VersionExpressionSet, options: ParserOptions<AstNode>) {
    super(ast, options, true);

    this.items = ast.items.map((item) =>
      extractVariant(new VersionExpression(item, options))
    );
  }

  print(path: AstPath<VersionExpressionSet>, print: PrintFunction): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
