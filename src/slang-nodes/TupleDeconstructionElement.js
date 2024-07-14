import { SlangNode } from './SlangNode.js';

export class TupleDeconstructionElement extends SlangNode {
  member;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.member = ast.member
      ? parse(ast.member, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return this.member ? path.call(print, 'member') : '';
  }
}
