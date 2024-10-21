import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { AbicoderPragma } from './AbicoderPragma.js';
import { ExperimentalPragma } from './ExperimentalPragma.js';
import { VersionPragma } from './VersionPragma.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class Pragma implements SlangNode {
  readonly kind = NonterminalKind.Pragma;

  comments;

  loc;

  variant: AbicoderPragma | ExperimentalPragma | VersionPragma;

  constructor(
    ast: ast.Pragma,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.AbicoderPragma:
        this.variant = new AbicoderPragma(
          ast.variant as ast.AbicoderPragma,
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

  print(path: AstPath<Pragma>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}