import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals extends SlangNode {
  items;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
