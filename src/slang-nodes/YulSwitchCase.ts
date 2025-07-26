import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.YulSwitchCase['variant'],
  options: ParserOptions<AstNode>
): YulSwitchCase['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.YulDefaultCase:
      return new YulDefaultCase(variant as ast.YulDefaultCase, options);
    case NonterminalKind.YulValueCase:
      return new YulValueCase(variant as ast.YulValueCase, options);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class YulSwitchCase extends SlangNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  variant: YulDefaultCase | YulValueCase;

  constructor(ast: ast.YulSwitchCase, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulSwitchCase>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
