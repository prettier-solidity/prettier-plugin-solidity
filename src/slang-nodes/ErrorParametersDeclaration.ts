import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ErrorParameters } from './ErrorParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ErrorParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ErrorParametersDeclaration;

  comments;

  loc;

  parameters: ErrorParameters;

  constructor(ast: ast.ErrorParametersDeclaration) {
    let metadata = getNodeMetadata(ast);

    this.parameters = new ErrorParameters(ast.parameters);

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ErrorParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
