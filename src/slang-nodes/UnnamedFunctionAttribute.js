import { SlangNode } from './SlangNode.js';

export class UnnamedFunctionAttribute extends SlangNode {
  variant;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.variant =
      ast.variant.type === 'Terminal'
        ? ast.variant.text
        : parse(ast.variant, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
