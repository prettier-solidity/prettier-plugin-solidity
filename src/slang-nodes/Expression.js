import { SlangNode } from './SlangNode.js';

export class Expression extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse) {
    super();
    if (offset) {
      this.initialize(ast, offset, comments, parse);
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
