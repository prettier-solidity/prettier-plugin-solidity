import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { OverridePaths } from './OverridePaths.js';

export class OverridePathsDeclaration extends SlangNode {
  get kind() {
    return NonterminalKind.OverridePathsDeclaration;
  }

  openParen;

  paths;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openParen: ast.openParen.text,
      paths: new OverridePaths(ast.paths, offsets[0], options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: OverridePathsDeclaration'];
  }
}
