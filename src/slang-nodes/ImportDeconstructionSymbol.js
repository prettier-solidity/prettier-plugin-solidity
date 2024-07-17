import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';

export class ImportDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { name, alias } = ast;
      this.name = name.text;
      this.alias =
        typeof alias === 'undefined'
          ? undefined
          : new ImportAlias(
              alias,
              childrenOffsets.shift(),
              comments,
              parse,
              options
            );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
