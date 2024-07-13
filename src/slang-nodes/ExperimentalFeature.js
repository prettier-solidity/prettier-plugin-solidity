import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';

export class ExperimentalFeature extends SlangNode {
  variant;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.variant =
      ast.variant.type === 'Terminal'
        ? ast.variant.text
        : new StringLiteral(ast.variant, this.nextChildOffset, options);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
