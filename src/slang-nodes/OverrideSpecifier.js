import { SlangNode } from './SlangNode.js';

export class OverrideSpecifier extends SlangNode {
  overrideKeyword;

  overridden;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.overrideKeyword = ast.overrideKeyword.text;
    if (ast.overridden) {
      this.overridden = parse(ast.overridden, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      this.overrideKeyword,
      this.overridden ? path.call(print, 'overridden') : ''
    ];
  }
}
