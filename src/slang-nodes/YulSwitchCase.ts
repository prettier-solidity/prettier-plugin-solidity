import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulSwitchCase implements SlangNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  comments;

  loc;

  variant: YulDefaultCase | YulValueCase;

  constructor(ast: ast.YulSwitchCase, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.YulDefaultCase:
        this.variant = new YulDefaultCase(
          ast.variant as ast.YulDefaultCase,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulValueCase:
        this.variant = new YulValueCase(
          ast.variant as ast.YulValueCase,
          offsets[0],
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

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
