import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join, hardline } = doc.builders;

export class HexStringLiterals extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
