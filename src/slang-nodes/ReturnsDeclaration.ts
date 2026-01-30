import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { group } = doc.builders;

export class ReturnsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ReturnsDeclaration;

  variables: ParametersDeclaration;

  constructor(
    ast: ast.ReturnsDeclaration,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variables = new ParametersDeclaration(
      ast.variables,
      collected,
      options
    );

    this.updateMetadata(this.variables);
  }

  print(path: AstPath<ReturnsDeclaration>, print: PrintFunction): Doc {
    return ['returns ', group(path.call(print, 'variables'))];
  }
}
