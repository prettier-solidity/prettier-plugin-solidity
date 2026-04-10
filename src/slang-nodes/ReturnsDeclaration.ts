import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { group } = doc.builders;

export class ReturnsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ReturnsDeclaration;

  variables: ParametersDeclaration;

  constructor(
    ast: ast.ReturnsDeclaration,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.variables = new ParametersDeclaration(
      ast.variables,
      collected,
      options
    );

    this.updateMetadata(this.variables);
  }

  print(print: PrintFunction): Doc {
    return ['returns ', group(print('variables'))];
  }
}
