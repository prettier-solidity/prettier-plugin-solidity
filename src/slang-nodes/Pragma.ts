import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { AbicoderPragma } from './AbicoderPragma.ts';
import { ExperimentalPragma } from './ExperimentalPragma.ts';
import { VersionPragma } from './VersionPragma.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.Pragma,
  Pragma
>([
  [ast.AbicoderPragma, AbicoderPragma],
  [ast.ExperimentalPragma, ExperimentalPragma],
  [ast.VersionPragma, VersionPragma]
]);

export class Pragma extends SlangNode {
  readonly kind = NonterminalKind.Pragma;

  variant: AbicoderPragma | ExperimentalPragma | VersionPragma;

  constructor(ast: ast.Pragma, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
