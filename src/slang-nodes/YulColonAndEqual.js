import { SlangNode } from './SlangNode.js';

export class YulColonAndEqual extends SlangNode {
  colon;

  equal;

  constructor(ast, offset) {
    super(ast, offset);
    this.colon = ast.colon.text;
    this.equal = ast.equal.text;
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulColonAndEqual'];
  }
}
