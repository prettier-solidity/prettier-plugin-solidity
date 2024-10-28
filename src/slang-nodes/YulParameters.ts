import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulParameters implements SlangNode {
  readonly kind = NonterminalKind.YulParameters;

  comments;

  loc;

  items: YulIdentifier[];

  separators: string[];

  constructor(ast: ast.YulParameters) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new YulIdentifier(item));
    this.separators = ast.separators.map((separator) => separator.unparse());

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulParameters>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
