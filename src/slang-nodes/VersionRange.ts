import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionLiteral } from './VersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class VersionRange implements SlangNode {
  readonly kind = NonterminalKind.VersionRange;

  comments;

  loc;

  start: VersionLiteral;

  end: VersionLiteral;

  constructor(ast: ast.VersionRange) {
    let metadata = getNodeMetadata(ast);

    this.start = new VersionLiteral(ast.start);
    this.end = new VersionLiteral(ast.end);

    metadata = updateMetadata(metadata, [this.start, this.end]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VersionRange>, print: PrintFunction): Doc {
    return [path.call(print, 'start'), ' - ', path.call(print, 'end')];
  }
}
