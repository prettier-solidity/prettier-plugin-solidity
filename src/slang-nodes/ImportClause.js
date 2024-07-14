import { SlangNode } from './SlangNode.js';

export class ImportClause extends SlangNode {
  variant;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
