import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingAlias } from './UsingAlias.js';

export class UsingDeconstructionSymbol extends SlangNode {
  get kind() {
    return NonterminalKind.UsingDeconstructionSymbol;
  }

  name;

  alias;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      name: new IdentifierPath(ast.name, offsets[0], options),
      alias: ast.alias
        ? new UsingAlias(ast.alias, offsets[1], options)
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
