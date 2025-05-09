import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleMember } from './TupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class TupleDeconstructionElement implements SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElement;

  comments;

  loc;

  member?: TupleMember;

  constructor(ast: ast.TupleDeconstructionElement) {
    let metadata = getNodeMetadata(ast);

    if (ast.member) {
      this.member = new TupleMember(ast.member);
    }

    metadata = updateMetadata(metadata, [this.member]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TupleDeconstructionElement>, print: PrintFunction): Doc {
    return path.call(print, 'member');
  }
}
