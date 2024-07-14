import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join } = doc.builders;

export class VersionExpressionSet extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return join(' ', path.map(print, 'items'));
  }
}
