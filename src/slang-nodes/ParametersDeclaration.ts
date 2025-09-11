import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Parameters } from './Parameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ParametersDeclaration;

  parameters: Parameters;

  constructor(ast: ast.ParametersDeclaration, options: ParserOptions<AstNode>) {
    super(ast);

    this.parameters = new Parameters(ast.parameters, options);

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<ParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
