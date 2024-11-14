import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingAlias } from './UsingAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UsingDeconstructionSymbol implements SlangNode {
  readonly kind = NonterminalKind.UsingDeconstructionSymbol;

  comments;

  loc;

  name: IdentifierPath;

  alias?: UsingAlias;

  constructor(ast: ast.UsingDeconstructionSymbol) {
    let metadata = getNodeMetadata(ast);

    this.name = new IdentifierPath(ast.name);
    if (ast.alias) {
      this.alias = new UsingAlias(ast.alias);
    }

    metadata = updateMetadata(metadata, [this.name, this.alias]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<UsingDeconstructionSymbol>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'alias')];
  }
}
