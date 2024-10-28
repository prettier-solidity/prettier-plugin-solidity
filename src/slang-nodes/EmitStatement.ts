import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class EmitStatement implements SlangNode {
  readonly kind = NonterminalKind.EmitStatement;

  comments;

  loc;

  event: IdentifierPath;

  arguments: ArgumentsDeclaration;

  constructor(ast: ast.EmitStatement, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.event = new IdentifierPath(ast.event);
    this.arguments = new ArgumentsDeclaration(ast.arguments, options);

    metadata = updateMetadata(metadata, [this.event, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
