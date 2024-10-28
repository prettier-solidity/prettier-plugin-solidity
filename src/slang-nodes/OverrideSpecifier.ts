import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class OverrideSpecifier implements SlangNode {
  readonly kind = NonterminalKind.OverrideSpecifier;

  comments;

  loc;

  overridden?: OverridePathsDeclaration;

  constructor(ast: ast.OverrideSpecifier) {
    let metadata = getNodeMetadata(ast);

    if (ast.overridden) {
      this.overridden = new OverridePathsDeclaration(ast.overridden);
    }

    metadata = updateMetadata(metadata, [this.overridden]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<OverrideSpecifier>, print: PrintFunction): Doc {
    return ['override', path.call(print, 'overridden')];
  }
}
