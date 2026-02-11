import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type { CollectedMetadata } from '../types.d.ts';

const variantConstructors = {
  [ast.IdentifierPath.name]: IdentifierPath,
  [ast.UsingDeconstruction.name]: UsingDeconstruction
};

function createNonterminalVariant(
  variant: ast.UsingClause['variant'],
  collected: CollectedMetadata
): UsingClause['variant'] {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected);

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
}

export class UsingClause extends SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
