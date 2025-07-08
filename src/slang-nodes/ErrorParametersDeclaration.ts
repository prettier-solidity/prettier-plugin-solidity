import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ErrorParameters } from './ErrorParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ErrorParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ErrorParametersDeclaration;

  comments;

  loc;

  parameters: ErrorParameters;

  constructor(
    ast: ast.ErrorParametersDeclaration,
    options: ParserOptions<AstNode>
  ) {
    const metadata = getNodeMetadata(ast);

    this.parameters = new ErrorParameters(ast.parameters, options);

    [this.loc, this.comments] = updateMetadata(metadata, [this.parameters]);
  }

  print(path: AstPath<ErrorParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
