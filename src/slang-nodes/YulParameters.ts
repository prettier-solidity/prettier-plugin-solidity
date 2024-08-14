import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class YulParameters implements SlangNode {
  readonly kind = NonterminalKind.YulParameters;

  comments;

  loc;

  items: YulIdentifier[];

  separators: string[];

  constructor(ast: ast.YulParameters, offset: number) {
    const metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new YulIdentifier(item, offsets[index])
    );
    this.separators = ast.separators.map((separator) => separator.text);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulParameters>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
