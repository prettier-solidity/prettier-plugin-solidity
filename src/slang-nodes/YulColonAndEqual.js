import { SlangNode } from './SlangNode.js';

export class YulColonAndEqual extends SlangNode {
  colon;

  equal;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulColonAndEqual'];
  }
}
