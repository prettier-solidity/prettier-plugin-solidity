import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { InheritanceTypes } from './InheritanceTypes.js';

export class InheritanceSpecifier extends SlangNode {
  get kind() {
    return NonterminalKind.InheritanceSpecifier;
  }

  isKeyword;

  types;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      isKeyword: ast.isKeyword?.text,
      types: new InheritanceTypes(ast.types, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.isKeyword, path.call(print, 'types')];
  }
}
