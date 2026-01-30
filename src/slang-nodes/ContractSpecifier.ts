import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { StorageLayoutSpecifier } from './StorageLayoutSpecifier.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.ContractSpecifier['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): ContractSpecifier['variant'] {
  if (variant instanceof ast.InheritanceSpecifier) {
    return new InheritanceSpecifier(variant, collected, options);
  }
  if (variant instanceof ast.StorageLayoutSpecifier) {
    return new StorageLayoutSpecifier(variant, collected, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class ContractSpecifier extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifier;

  variant: InheritanceSpecifier | StorageLayoutSpecifier;

  constructor(
    ast: ast.ContractSpecifier,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
