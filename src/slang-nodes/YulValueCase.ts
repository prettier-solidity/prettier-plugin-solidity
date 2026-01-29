import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulValueCase extends SlangNode {
  readonly kind = NonterminalKind.YulValueCase;

  value: YulLiteral['variant'];

  body: YulBlock;

  constructor(
    ast: ast.YulValueCase,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.value = extractVariant(new YulLiteral(ast.value, collected, options));
    this.body = new YulBlock(ast.body, collected, options);

    this.updateMetadata(this.value, this.body);
  }

  print(path: AstPath<YulValueCase>, print: PrintFunction): Doc {
    return ['case ', path.call(print, 'value'), ' ', path.call(print, 'body')];
  }
}
