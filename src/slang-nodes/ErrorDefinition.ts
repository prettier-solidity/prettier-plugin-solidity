import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class ErrorDefinition implements SlangNode {
  readonly kind = NonterminalKind.ErrorDefinition;

  comments;

  loc;

  errorKeyword: string;

  name: string;

  members: ErrorParametersDeclaration;

  semicolon: string;

  constructor(
    ast: ast.ErrorDefinition,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.errorKeyword = ast.errorKeyword.text;
    this.name = ast.name.text;
    this.members = new ErrorParametersDeclaration(
      ast.members,
      offsets[0],
      options
    );
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.errorKeyword} ${this.name}`,
      path.call(print, 'members'),
      this.semicolon
    ];
  }
}
