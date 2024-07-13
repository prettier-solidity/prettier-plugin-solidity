import { SlangNode } from './SlangNode.js';

export class Expression extends SlangNode {
  variant;

  constructor({ ast, parse, offset, options, kind, loc, variant }) {
    super(ast, offset);
    if (ast) {
      this.variant =
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : parse(ast.variant, parse, this.nextChildOffset);
      this.initiateLoc(ast);
    } else {
      this.kind = kind;
      this.loc = loc;
      this.variant = variant;
    }
  }

  print({ path, print }) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
