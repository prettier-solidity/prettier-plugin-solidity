import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AbicoderPragma } from './AbicoderPragma.js';
import { ExperimentalPragma } from './ExperimentalPragma.js';
import { VersionPragma } from './VersionPragma.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.Pragma['variant'],
  options: ParserOptions<AstNode>
): Pragma['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.AbicoderPragma:
      return new AbicoderPragma(variant as ast.AbicoderPragma);
    case NonterminalKind.ExperimentalPragma:
      return new ExperimentalPragma(variant as ast.ExperimentalPragma, options);
    case NonterminalKind.VersionPragma:
      return new VersionPragma(variant as ast.VersionPragma);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class Pragma extends SlangNode {
  readonly kind = NonterminalKind.Pragma;

  variant: AbicoderPragma | ExperimentalPragma | VersionPragma;

  constructor(ast: ast.Pragma, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<Pragma>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
