import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class EmitStatement extends SlangNode {
  readonly kind = NonterminalKind.EmitStatement;

  event: IdentifierPath;

  arguments: ArgumentsDeclaration['variant'];

  constructor(ast: ast.EmitStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.event = new IdentifierPath(ast.event);
    this.arguments = extractVariant(
      new ArgumentsDeclaration(ast.arguments, options)
    );

    this.updateMetadata(this.event, this.arguments);
  }

  print(path: AstPath<EmitStatement>, print: PrintFunction): Doc {
    return [
      'emit ',
      path.call(print, 'event'),
      path.call(print, 'arguments'),
      ';'
    ];
  }
}
