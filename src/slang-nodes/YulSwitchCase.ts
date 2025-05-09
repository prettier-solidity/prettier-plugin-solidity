import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulSwitchCase implements SlangNode {
  readonly kind = NonterminalKind.YulSwitchCase;

  comments;

  loc;

  variant: YulDefaultCase | YulValueCase;

  constructor(ast: ast.YulSwitchCase) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.YulDefaultCase:
        this.variant = new YulDefaultCase(ast.variant as ast.YulDefaultCase);
        break;
      case NonterminalKind.YulValueCase:
        this.variant = new YulValueCase(ast.variant as ast.YulValueCase);
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
