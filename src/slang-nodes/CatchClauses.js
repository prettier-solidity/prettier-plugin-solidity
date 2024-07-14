import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join } = doc.builders;

export class CatchClauses extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return join(' ', path.map(print, 'items'));
  }
}
