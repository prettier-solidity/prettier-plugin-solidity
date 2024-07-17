import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';

export class ImportDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: ast.name.text,
      alias: ast.alias
        ? new ImportAlias(ast.alias, childrenOffsets.shift(), comments, options)
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
