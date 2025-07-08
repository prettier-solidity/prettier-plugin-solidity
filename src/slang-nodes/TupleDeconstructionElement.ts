import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleMember } from './TupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class TupleDeconstructionElement implements SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElement;

  comments;

  loc;

  member?: TupleMember;

  constructor(
    ast: ast.TupleDeconstructionElement,
    options: ParserOptions<AstNode>
  ) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    if (ast.member) {
      this.member = new TupleMember(ast.member, options);
    }

    updateMetadata(this.loc, this.comments, [this.member]);
  }

  print(path: AstPath<TupleDeconstructionElement>, print: PrintFunction): Doc {
    return path.call(print, 'member');
  }
}
