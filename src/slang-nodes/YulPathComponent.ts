import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulPathComponent implements SlangNode {
  readonly kind = NonterminalKind.YulPathComponent;

  comments;

  loc;

  variant: YulIdentifier;

  constructor(ast: ast.YulPathComponent) {
    const metadata = getNodeMetadata(ast);

    this.variant = new YulIdentifier(ast.variant);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulPathComponent>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
