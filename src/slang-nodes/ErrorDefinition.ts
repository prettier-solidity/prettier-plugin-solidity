import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class ErrorDefinition implements SlangNode {
  readonly kind = NonterminalKind.ErrorDefinition;

  comments;

  loc;

  name: Identifier;

  members: ErrorParametersDeclaration;

  constructor(
    ast: ast.ErrorDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new Identifier(ast.name, offsets[0]);
    this.members = new ErrorParametersDeclaration(
      ast.members,
      offsets[1],
      options
    );

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ErrorDefinition>, print: PrintFunction): Doc {
    return [
      'error ',
      path.call(print, 'name'),
      path.call(print, 'members'),
      ';'
    ];
  }
}
