import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class OverrideSpecifier implements SlangNode {
  readonly kind = NonterminalKind.OverrideSpecifier;

  comments;

  loc;

  overrideKeyword: string;

  overridden?: OverridePathsDeclaration;

  constructor(ast: ast.OverrideSpecifier, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.overrideKeyword = ast.overrideKeyword.text;
    if (ast.overridden) {
      this.overridden = new OverridePathsDeclaration(
        ast.overridden,
        offsets[0]
      );
    }

    metadata = updateMetadata(metadata, [this.overridden]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      this.overrideKeyword,
      this.overridden ? path.call(print, 'overridden') : ''
    ];
  }
}
