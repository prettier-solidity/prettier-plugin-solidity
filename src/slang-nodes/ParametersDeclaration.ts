import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Parameters } from './Parameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ParametersDeclaration;

  parameters: Parameters;

  constructor(
    ast: ast.ParametersDeclaration,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.parameters = new Parameters(ast.parameters, collected, options);

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<ParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
