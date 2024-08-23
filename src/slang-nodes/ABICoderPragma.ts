import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class ABICoderPragma implements SlangNode {
  readonly kind = NonterminalKind.ABICoderPragma;

  comments;

  loc;

  version: Identifier;

  constructor(ast: ast.ABICoderPragma) {
    const metadata = getNodeMetadata(ast);

    this.version = new Identifier(ast.version);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ABICoderPragma>, print: PrintFunction): Doc {
    return ['abicoder ', path.call(print, 'version')];
  }
}
