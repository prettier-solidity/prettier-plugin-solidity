import { SlangNode } from './SlangNode.js';

export class YulColonAndEqual extends SlangNode {
  colon;

  equal;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulColonAndEqual'];
  }
}
