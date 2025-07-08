import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ErrorDefinition implements SlangNode {
  readonly kind = NonterminalKind.ErrorDefinition;

  comments;

  loc;

  name: Identifier;

  members: ErrorParametersDeclaration;

  constructor(ast: ast.ErrorDefinition, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    this.members = new ErrorParametersDeclaration(ast.members, options);

    updateMetadata(this.loc, this.comments, [this.members]);
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
