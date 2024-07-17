import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingAlias } from './UsingAlias.js';

export class UsingDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: new IdentifierPath(
        ast.name,
        childrenOffsets.shift(),
        comments,
        options
      ),
      alias: ast.alias
        ? new UsingAlias(ast.alias, childrenOffsets.shift(), comments, options)
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
