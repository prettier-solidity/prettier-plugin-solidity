import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingAlias } from './UsingAlias.js';

export class UsingDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: new IdentifierPath(ast.name, childrenOffsets.shift(), options),
      alias: ast.alias
        ? new UsingAlias(ast.alias, childrenOffsets.shift(), options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
