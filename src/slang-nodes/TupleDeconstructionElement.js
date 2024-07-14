import { SlangNode } from './SlangNode.js';

export class TupleDeconstructionElement extends SlangNode {
  member;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return this.member ? path.call(print, 'member') : '';
  }
}
