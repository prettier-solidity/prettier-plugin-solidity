import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { join } = doc.builders;

export class VersionExpressionSets extends SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSets;

  items: VersionExpressionSet[];

  constructor(ast: ast.VersionExpressionSets, options: ParserOptions<AstNode>) {
    super(ast, options, true);

    this.items = ast.items.map(
      (item) => new VersionExpressionSet(item, options)
    );
  }

  print(path: AstPath<VersionExpressionSets>, print: PrintFunction): Doc {
    return join(' || ', path.map(print, 'items'));
  }
}
