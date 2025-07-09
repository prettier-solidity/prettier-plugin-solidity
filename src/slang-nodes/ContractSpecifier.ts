import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { StorageLayoutSpecifier } from './StorageLayoutSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ContractSpecifier extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifier;

  variant: InheritanceSpecifier | StorageLayoutSpecifier;

  constructor(ast: ast.ContractSpecifier, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.InheritanceSpecifier:
        this.variant = new InheritanceSpecifier(
          variant as ast.InheritanceSpecifier,
          options
        );
        break;
      case NonterminalKind.StorageLayoutSpecifier:
        this.variant = new StorageLayoutSpecifier(
          variant as ast.StorageLayoutSpecifier,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }
    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ContractSpecifier>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
