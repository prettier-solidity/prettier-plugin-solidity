import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingAlias } from './UsingAlias.js';

export class UsingDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { name, alias } = ast;
      this.name = new IdentifierPath(
        name,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      if (alias) {
        this.alias = new UsingAlias(
          alias,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
