import { SlangNode } from './SlangNode.js';

export class UsingClause extends SlangNode {
  variant;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
