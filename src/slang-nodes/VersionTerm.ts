import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionOperator } from './VersionOperator.js';
import { VersionLiteral } from './VersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class VersionTerm implements SlangNode {
  readonly kind = NonterminalKind.VersionTerm;

  comments;

  loc;

  operator?: VersionOperator;

  literal: VersionLiteral;

  constructor(ast: ast.VersionTerm) {
    let metadata = getNodeMetadata(ast);

    if (ast.operator) {
      this.operator = new VersionOperator(ast.operator);
    }
    this.literal = new VersionLiteral(ast.literal);

    metadata = updateMetadata(metadata, [this.operator, this.literal]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VersionTerm>, print: PrintFunction): Doc {
    return [path.call(print, 'operator'), path.call(print, 'literal')];
  }
}
