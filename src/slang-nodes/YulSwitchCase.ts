import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulSwitchCase implements SlangNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  comments;

  loc;

  variant: YulDefaultCase | YulValueCase;

  constructor(ast: ast.YulSwitchCase, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.YulDefaultCase:
        this.variant = new YulDefaultCase(
          ast.variant as ast.YulDefaultCase,
          options
        );
        break;
      case NonterminalKind.YulValueCase:
        this.variant = new YulValueCase(
          ast.variant as ast.YulValueCase,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulSwitchCase>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
