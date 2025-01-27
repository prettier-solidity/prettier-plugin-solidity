import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulPath implements SlangNode {
  readonly kind = NonterminalKind.YulPath;

  comments;

  loc;

  items: YulIdentifier[];

  separators: string[];

  constructor(ast: ast.YulPath) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new YulIdentifier(item));
    this.separators = ast.separators.map((separator) => separator.unparse());

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulPath>, print: PrintFunction): Doc {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [this.separators[index - 1], item]
      );
  }
}
