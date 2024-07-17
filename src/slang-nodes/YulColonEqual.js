import { SlangNode } from './SlangNode.js';

export class YulColonEqual extends SlangNode {
  colon;

  equal;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      colon: ast.colon.text,
      equal: ast.equal.text
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulColonEqual'];
  }
}
