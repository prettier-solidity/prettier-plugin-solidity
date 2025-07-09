import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { StorageLayoutSpecifier } from './StorageLayoutSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ContractSpecifier implements SlangNode {
  readonly kind = NonterminalKind.ContractSpecifier;

  comments;

  loc;

  variant: InheritanceSpecifier | StorageLayoutSpecifier;

  constructor(ast: ast.ContractSpecifier, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.InheritanceSpecifier:
        this.variant = new InheritanceSpecifier(
          ast.variant as ast.InheritanceSpecifier,
          options
        );
        break;
      case NonterminalKind.StorageLayoutSpecifier:
        this.variant = new StorageLayoutSpecifier(
          ast.variant as ast.StorageLayoutSpecifier,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }
    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ContractSpecifier>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
