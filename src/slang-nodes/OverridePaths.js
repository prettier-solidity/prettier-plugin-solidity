import { SlangNode } from './SlangNode.js';

export class OverridePaths extends SlangNode {
  items;

  separators;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: OverridePaths'];
  }
}
