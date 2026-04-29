import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { AbicoderPragma } from './AbicoderPragma.js';
import { ExperimentalPragma } from './ExperimentalPragma.js';
import { VersionPragma } from './VersionPragma.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.Pragma,
  Pragma
>([
  [ast.AbicoderPragma, AbicoderPragma],
  [ast.ExperimentalPragma, ExperimentalPragma],
  [ast.VersionPragma, VersionPragma]
]);

export class Pragma extends PolymorphicNonterminalNode<
  ast.Pragma,
  AbicoderPragma | ExperimentalPragma | VersionPragma
> {
  readonly kind = NonterminalKind.Pragma;

  constructor(ast: ast.Pragma, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
