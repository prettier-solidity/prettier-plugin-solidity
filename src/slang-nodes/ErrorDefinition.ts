const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ErrorDefinition extends SlangNode {
  readonly kind = NonterminalKind.ErrorDefinition;

  name: Identifier;

  members: ErrorParametersDeclaration;

  constructor(ast: ast.ErrorDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new Identifier(ast.name);
    this.members = new ErrorParametersDeclaration(ast.members, options);

    this.updateMetadata(this.members);
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
