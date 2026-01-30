import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type { CollectedMetadata } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.UsingClause['variant'],
  collected: CollectedMetadata
): UsingClause['variant'] {
  if (variant instanceof ast.IdentifierPath) {
    return new IdentifierPath(variant, collected);
  }
  if (variant instanceof ast.UsingDeconstruction) {
    return new UsingDeconstruction(variant, collected);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
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
