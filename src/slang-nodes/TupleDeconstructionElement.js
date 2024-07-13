import { SlangNode } from './SlangNode.js';

export class TupleDeconstructionElement extends SlangNode {
  member;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.member = ast.member
      ? parse(ast.member, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return this.member ? path.call(print, 'member') : '';
  }
}
