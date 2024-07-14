import { SlangNode } from './SlangNode.js';

export class VersionRange extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: VersionRange'];
  }
}
