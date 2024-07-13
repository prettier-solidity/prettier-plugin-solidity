import { SlangNode } from './SlangNode.js';

export class TypeName extends SlangNode {
  variant;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.variant = parse(ast.variant, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
