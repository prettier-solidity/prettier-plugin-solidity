import { NonterminalKind, SlangAst } from '../slang-utils/slang.ts';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { AbicoderPragma } from './AbicoderPragma.ts';
import { ExperimentalPragma } from './ExperimentalPragma.ts';
import { VersionPragma } from './VersionPragma.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.Pragma,
  Pragma
>(() => [
  [SlangAst.AbicoderPragma, AbicoderPragma],
  [SlangAst.ExperimentalPragma, ExperimentalPragma],
  [SlangAst.VersionPragma, VersionPragma]
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
