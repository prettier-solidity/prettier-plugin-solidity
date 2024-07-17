import { SlangNode } from './SlangNode.js';
import { TupleMember } from './TupleMember.js';

export class TupleDeconstructionElement extends SlangNode {
  member;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      member: ast.member
        ? new TupleMember(
            ast.member,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return this.member ? path.call(print, 'member') : '';
  }
}
