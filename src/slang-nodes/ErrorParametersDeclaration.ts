import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ErrorParameters } from './ErrorParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ErrorParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ErrorParametersDeclaration;

  parameters: ErrorParameters;

  constructor(
    ast: ast.ErrorParametersDeclaration,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.parameters = new ErrorParameters(ast.parameters, options);

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<ErrorParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
