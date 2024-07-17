import { SlangNode } from './SlangNode.js';

export class YulColonEqual extends SlangNode {
  colon;

  equal;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { colon, equal } = ast;
      this.colon = colon.text;
      this.equal = equal.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulColonEqual'];
  }
}
