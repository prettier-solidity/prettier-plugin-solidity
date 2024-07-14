import { SlangNode } from './SlangNode.js';

export class UncheckedBlock extends SlangNode {
  uncheckedKeyword;

  block;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.uncheckedKeyword = ast.uncheckedKeyword.text;
    this.block = parse(ast.block, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [`${this.uncheckedKeyword} `, path.call(print, 'block')];
  }
}
