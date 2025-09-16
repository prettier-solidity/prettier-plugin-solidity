import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class RevertStatement extends SlangNode {
  readonly kind = NonterminalKind.RevertStatement;

  error?: IdentifierPath;

  arguments: ArgumentsDeclaration['variant'];

  constructor(ast: ast.RevertStatement, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.error) {
      this.error = new IdentifierPath(ast.error);
    }
    this.arguments = extractVariant(
      new ArgumentsDeclaration(ast.arguments, options)
    );

    this.updateMetadata(this.error, this.arguments);
  }

  print(path: AstPath<RevertStatement>, print: PrintFunction): Doc {
    return [
      joinExisting(' ', ['revert', path.call(print, 'error')]),
      path.call(print, 'arguments'),
      ';'
    ];
  }
}
