import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ErrorParameters } from './ErrorParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class ErrorParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ErrorParametersDeclaration;

  comments;

  loc;

  parameters: ErrorParameters;

  constructor(
    ast: ast.ErrorParametersDeclaration,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.parameters = new ErrorParameters(ast.parameters, offsets[0], options);

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ErrorParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
