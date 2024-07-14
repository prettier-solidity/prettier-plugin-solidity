import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join, hardline } = doc.builders;

export class UnicodeStringLiterals extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
