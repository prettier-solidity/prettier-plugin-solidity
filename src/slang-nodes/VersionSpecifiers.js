import { SlangNode } from './SlangNode.js';

export class VersionSpecifiers extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return this.items.map((item, index) =>
      index === 0 ? item : [this.separators[index - 1], item]
    );
  }
}
