import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleMember } from './TupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class TupleDeconstructionElement implements SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElement;

  comments;

  loc;

  member?: TupleMember;

  constructor(
    ast: ast.TupleDeconstructionElement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    if (ast.member) {
      this.member = new TupleMember(ast.member, offsets[0], options);
    }

    metadata = updateMetadata(metadata, [this.member]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TupleDeconstructionElement>, print: PrintFunction): Doc {
    return path.call(print, 'member');
  }
}
