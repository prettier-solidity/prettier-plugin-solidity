import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { StorageLayoutSpecifier } from './StorageLayoutSpecifier.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.ContractSpecifier['variant'],
  options: ParserOptions<AstNode>
): ContractSpecifier['variant'] {
  if (variant instanceof ast.InheritanceSpecifier) {
    return new InheritanceSpecifier(variant, options);
  }
  if (variant instanceof ast.StorageLayoutSpecifier) {
    return new StorageLayoutSpecifier(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class ContractSpecifier extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifier;

  variant: InheritanceSpecifier | StorageLayoutSpecifier;

  constructor(ast: ast.ContractSpecifier, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
