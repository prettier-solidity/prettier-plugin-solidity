import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Parameters } from './Parameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class ParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ParametersDeclaration;

  comments;

  loc;

  parameters: Parameters;

  constructor(
    ast: ast.ParametersDeclaration,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.parameters = new Parameters(ast.parameters, offsets[0], options);

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<ParametersDeclaration>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
