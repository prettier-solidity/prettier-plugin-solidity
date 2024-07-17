import { SlangNode } from './SlangNode.js';

export class VersionSpecifiers extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { items, separators } = ast;
      this.items = items.map((item) => item.text);
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print() {
    return this.items.map((item, index) =>
      index === 0 ? item : [this.separators[index - 1], item]
    );
  }
}
