import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join } = doc.builders;

export class VersionExpressionSet extends SlangNode {
  items;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return join(' ', path.map(print, 'items'));
  }
}
