import { SlangNode } from './SlangNode.js';
import { TupleMember } from './TupleMember.js';

export class TupleDeconstructionElement extends SlangNode {
  member;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { member } = ast;
      if (member) {
        this.member = new TupleMember(
          member,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return this.member ? path.call(print, 'member') : '';
  }
}
