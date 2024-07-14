import { printPreservingEmptyLines } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class SourceUnitMembers extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print, options) {
    return printPreservingEmptyLines(path, 'items', options, print);
  }
}
