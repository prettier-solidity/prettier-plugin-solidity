import { SlangNode } from './SlangNode.js';
import { TupleMember } from './TupleMember.js';

export class TupleDeconstructionElement extends SlangNode {
  member;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { member } = ast;
      if (member) {
        this.member = new TupleMember(
          member,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return this.member ? path.call(print, 'member') : '';
  }
}
