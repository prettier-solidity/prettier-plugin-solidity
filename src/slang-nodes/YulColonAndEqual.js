import { SlangNode } from './SlangNode.js';

export class YulColonAndEqual extends SlangNode {
  colon;

  equal;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulColonAndEqual'];
  }
}
