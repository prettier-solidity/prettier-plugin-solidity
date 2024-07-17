import { SlangNode } from './SlangNode.js';
import { VersionExpressionSets } from './VersionExpressionSets.js';

export class VersionPragma extends SlangNode {
  solidityKeyword;

  sets;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      solidityKeyword: ast.solidityKeyword.text,
      sets: new VersionExpressionSets(
        ast.sets,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [`${this.solidityKeyword} `, path.call(print, 'sets')];
  }
}
