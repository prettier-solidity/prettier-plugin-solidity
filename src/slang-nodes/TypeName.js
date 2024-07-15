import { SlangNode } from './SlangNode.js';

export class TypeName extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
