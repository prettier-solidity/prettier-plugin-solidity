import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { StorageLayoutSpecifier } from './StorageLayoutSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.ContractSpecifier['variant'],
  options: ParserOptions<AstNode>
): ContractSpecifier['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.InheritanceSpecifier:
      return new InheritanceSpecifier(
        variant as ast.InheritanceSpecifier,
        options
      );
    case NonterminalKind.StorageLayoutSpecifier:
      return new StorageLayoutSpecifier(
        variant as ast.StorageLayoutSpecifier,
        options
      );
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class ContractSpecifier extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifier;

  variant: InheritanceSpecifier | StorageLayoutSpecifier;

  constructor(ast: ast.ContractSpecifier, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ContractSpecifier>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
