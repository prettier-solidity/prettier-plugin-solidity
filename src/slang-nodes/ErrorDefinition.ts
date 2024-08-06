import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class ErrorDefinition implements SlangNode {
  readonly kind = NonterminalKind.ErrorDefinition;

  comments;

  loc;

  name: string;

  members: ErrorParametersDeclaration;

  constructor(
    ast: ast.ErrorDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = ast.name.text;
    this.members = new ErrorParametersDeclaration(
      ast.members,
      offsets[0],
      options
    );

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<ErrorDefinition>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [`error ${this.name}`, path.call(print, 'members'), ';'];
  }
}
