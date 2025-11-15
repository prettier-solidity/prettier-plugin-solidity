import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

function createNonterminalVariant(
  variant: ast.UsingClause['variant']
): UsingClause['variant'] {
  if (variant instanceof ast.IdentifierPath) {
    return new IdentifierPath(variant);
  }
  if (variant instanceof ast.UsingDeconstruction) {
    return new UsingDeconstruction(variant);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class UsingClause extends SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant);

    this.updateMetadata(this.variant);
  }
}
