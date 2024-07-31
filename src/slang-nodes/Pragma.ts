import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ABICoderPragma } from './ABICoderPragma.js';
import { ExperimentalPragma } from './ExperimentalPragma.js';
import { VersionPragma } from './VersionPragma.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class Pragma implements SlangNode {
  readonly kind = NonterminalKind.Pragma;

  comments;

  loc;

  variant: ABICoderPragma | ExperimentalPragma | VersionPragma;

  constructor(
    ast: ast.Pragma,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.ABICoderPragma:
        this.variant = new ABICoderPragma(
          ast.variant as ast.ABICoderPragma,
          offsets[0]
        );
        break;
      case NonterminalKind.ExperimentalPragma:
        this.variant = new ExperimentalPragma(
          ast.variant as ast.ExperimentalPragma,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.VersionPragma:
        this.variant = new VersionPragma(
          ast.variant as ast.VersionPragma,
          offsets[0]
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
