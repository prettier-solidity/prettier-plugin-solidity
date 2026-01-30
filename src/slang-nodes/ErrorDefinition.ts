import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ErrorDefinition extends SlangNode {
  readonly kind = NonterminalKind.ErrorDefinition;

  name: TerminalNode;

  members: ErrorParametersDeclaration;

  constructor(
    ast: ast.ErrorDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    this.members = new ErrorParametersDeclaration(
      ast.members,
      collected,
      options
    );

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
