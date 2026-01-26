import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

function createNonterminalVariant(
  variant: ast.UsingClause['variant'],
  options: ParserOptions<AstNode>
): UsingClause['variant'] {
  if (variant instanceof ast.IdentifierPath) {
    return new IdentifierPath(variant, options);
  }
  if (variant instanceof ast.UsingDeconstruction) {
    return new UsingDeconstruction(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class UsingClause extends SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
