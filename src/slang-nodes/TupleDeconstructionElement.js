import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TupleMember } from './TupleMember.js';

export class TupleDeconstructionElement extends SlangNode {
  get kind() {
    return NonterminalKind.TupleDeconstructionElement;
  }

  member;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      member: ast.member
        ? new TupleMember(ast.member, childrenOffsets.shift(), options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return this.member ? path.call(print, 'member') : '';
  }
}
