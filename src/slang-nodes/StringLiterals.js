import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join, hardline } = doc.builders;

export class StringLiterals extends SlangNode {
  items;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.items = ast.items.map((item) => parse(item, this.nextChildOffset));
    this.initiateLoc(ast);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
