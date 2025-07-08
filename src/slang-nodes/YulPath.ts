import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { join } = doc.builders;

export class YulPath implements SlangNode {
  readonly kind = NonterminalKind.YulPath;

  comments;

  loc;

  items: YulIdentifier[];

  constructor(ast: ast.YulPath) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new YulIdentifier(item));

    [this.loc, this.comments] = metadata;
  }

  print(path: AstPath<YulPath>, print: PrintFunction): Doc {
    return join('.', path.map(print, 'items'));
  }
}
