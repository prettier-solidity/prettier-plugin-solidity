import { SlangNode } from './SlangNode.js';

export class Expression extends SlangNode {
  variant;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    if (offset) {
      this.variant =
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : parse(ast.variant, this.nextChildOffset);
      this.initiateLoc(ast);
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
