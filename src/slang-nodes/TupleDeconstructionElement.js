import { SlangNode } from './SlangNode.js';

export class TupleDeconstructionElement extends SlangNode {
  member;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return this.member ? path.call(print, 'member') : '';
  }
}
