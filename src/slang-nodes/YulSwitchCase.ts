import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class YulSwitchCase extends SlangNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  variant: YulDefaultCase | YulValueCase;

  constructor(ast: ast.YulSwitchCase, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.YulDefaultCase:
        this.variant = new YulDefaultCase(
          variant as ast.YulDefaultCase,
          options
        );
        break;
      case NonterminalKind.YulValueCase:
        this.variant = new YulValueCase(variant as ast.YulValueCase, options);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulSwitchCase>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
