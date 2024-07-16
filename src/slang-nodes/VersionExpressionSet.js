import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join } = doc.builders;

export class VersionExpressionSet extends SlangNode {
  items;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return join(' ', path.map(print, 'items'));
  }
}
