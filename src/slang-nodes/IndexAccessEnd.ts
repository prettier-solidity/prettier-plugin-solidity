import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class IndexAccessEnd extends SlangNode {
  readonly kind = NonterminalKind.IndexAccessEnd;

  end?: Expression['variant'];

  constructor(ast: ast.IndexAccessEnd, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.end) {
      this.end = extractVariant(new Expression(ast.end, options));
    }

    this.updateMetadata(this.end);
  }

  print(path: AstPath<IndexAccessEnd>, print: PrintFunction): Doc {
    return [':', path.call(print, 'end')];
  }
}
