import { SlangNode } from './SlangNode.js';

export class Statement extends SlangNode {
  variant;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.variant = parse(ast.variant, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return path.call(print, 'variant');
  }
}
