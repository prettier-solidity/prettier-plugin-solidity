import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class RevertStatement implements SlangNode {
  readonly kind = NonterminalKind.RevertStatement;

  comments;

  loc;

  error?: IdentifierPath;

  arguments: ArgumentsDeclaration;

  constructor(ast: ast.RevertStatement, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    if (ast.error) {
      this.error = new IdentifierPath(ast.error);
    }
    this.arguments = new ArgumentsDeclaration(ast.arguments, options);

    [this.loc, this.comments] = updateMetadata(metadata, [
      this.error,
      this.arguments
    ]);
  }

  print(path: AstPath<RevertStatement>, print: PrintFunction): Doc {
    return [
      joinExisting(' ', ['revert', path.call(print, 'error')]),
      path.call(print, 'arguments'),
      ';'
    ];
  }
}
