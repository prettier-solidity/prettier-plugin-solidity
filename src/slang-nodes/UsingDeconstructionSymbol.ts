import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingAlias } from './UsingAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

export class UsingDeconstructionSymbol extends SlangNode {
  readonly kind = NonterminalKind.UsingDeconstructionSymbol;

  name: IdentifierPath;

  alias?: UsingAlias;

  constructor(
    ast: ast.UsingDeconstructionSymbol,
    options: ParserOptions<AstNode>
  ) {
    super(ast, options);

    this.name = new IdentifierPath(ast.name, options);
    if (ast.alias) {
      this.alias = new UsingAlias(ast.alias, options);
    }

    this.updateMetadata(this.name, this.alias);
  }

  print(path: AstPath<UsingDeconstructionSymbol>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'alias')];
  }
}
