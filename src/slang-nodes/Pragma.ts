import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AbicoderPragma } from './AbicoderPragma.js';
import { ExperimentalPragma } from './ExperimentalPragma.js';
import { VersionPragma } from './VersionPragma.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const variantConstructors = {
  [ast.AbicoderPragma.name]: AbicoderPragma,
  [ast.ExperimentalPragma.name]: ExperimentalPragma,
  [ast.VersionPragma.name]: VersionPragma
};

function createNonterminalVariant(
  variant: ast.Pragma['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): Pragma['variant'] {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
}

export class Pragma extends SlangNode {
  readonly kind = NonterminalKind.Pragma;

  variant: AbicoderPragma | ExperimentalPragma | VersionPragma;

  constructor(
    ast: ast.Pragma,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
