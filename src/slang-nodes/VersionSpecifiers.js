import { SlangNode } from './SlangNode.js';

export class VersionSpecifiers extends SlangNode {
  items;

  separators;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      items: ast.items.map((item) => item.text),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return this.items.map((item, index) =>
      index === 0 ? item : [this.separators[index - 1], item]
    );
  }
}
