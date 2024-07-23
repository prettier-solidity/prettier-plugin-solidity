import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';

export class ImportDeconstructionSymbol extends SlangNode {
  get kind() {
    return NonterminalKind.ImportDeconstructionSymbol;
  }

  name;

  alias;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      name: ast.name.text,
      alias: ast.alias
        ? new ImportAlias(ast.alias, offsets[0], options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
