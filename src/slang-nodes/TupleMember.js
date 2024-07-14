import { SlangNode } from './SlangNode.js';

export class TupleMember extends SlangNode {
  variant;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
