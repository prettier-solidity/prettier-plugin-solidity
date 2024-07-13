import { SlangNode } from './SlangNode.js';

export class OverrideSpecifier extends SlangNode {
  overrideKeyword;

  overridden;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.overrideKeyword = ast.overrideKeyword.text;
    this.overridden = ast.overridden
      ? parse(ast.overridden, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      this.overrideKeyword,
      this.overridden ? path.call(print, 'overridden') : ''
    ];
  }
}
