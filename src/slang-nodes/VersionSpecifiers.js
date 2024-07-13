import { SlangNode } from './SlangNode.js';

export class VersionSpecifiers extends SlangNode {
  items;

  separators;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.items = ast.items.map((item) => item.text);
    this.separators = ast.separators.map((separator) => separator.text);
    this.initiateLoc(ast);
  }

  print() {
    return this.items.map((item, index) =>
      index === 0 ? item : [this.separators[index - 1], item]
    );
  }
}
