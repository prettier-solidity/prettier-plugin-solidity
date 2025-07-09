import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AbicoderPragma } from './AbicoderPragma.js';
import { ExperimentalPragma } from './ExperimentalPragma.js';
import { VersionPragma } from './VersionPragma.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class Pragma extends SlangNode {
  readonly kind = NonterminalKind.Pragma;

  variant: AbicoderPragma | ExperimentalPragma | VersionPragma;

  constructor(ast: ast.Pragma, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.AbicoderPragma:
        this.variant = new AbicoderPragma(variant as ast.AbicoderPragma);
        break;
      case NonterminalKind.ExperimentalPragma:
        this.variant = new ExperimentalPragma(
          variant as ast.ExperimentalPragma,
          options
        );
        break;
      case NonterminalKind.VersionPragma:
        this.variant = new VersionPragma(variant as ast.VersionPragma);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<Pragma>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
