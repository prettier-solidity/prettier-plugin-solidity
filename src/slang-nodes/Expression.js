import { SlangNode } from './SlangNode.js';

export class Expression extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    if (offset) {
      this.initialize(ast, parse);
      this.finalize(ast);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.variant = ast.variant;
    }
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
