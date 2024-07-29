import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { isComment } from '../slang-utils/is-comment.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';
import type { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';

export class ModifierInvocation implements SlangNode {
  readonly kind = NonterminalKind.ModifierInvocation;

  comments;

  loc;

  cleanModifierInvocationArguments;

  name: IdentifierPath;

  arguments?: ArgumentsDeclaration;

  constructor(
    ast: ast.ModifierInvocation,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new IdentifierPath(ast.name, offsets[0]);
    this.arguments = ast.arguments
      ? new ArgumentsDeclaration(ast.arguments, offsets[1], options)
      : undefined;

    metadata = updateMetadata(metadata, [this.name, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.cleanModifierInvocationArguments = (): void => {
      if (
        this.arguments &&
        this.arguments.variant.kind === 'PositionalArgumentsDeclaration' &&
        this.arguments.variant.arguments.items.length === 0 && // no arguments
        !ast.arguments!.variant.cst.children().some((child) => isComment(child)) // no comments
      ) {
        this.arguments = undefined;
      }
    };
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      path.call(print, 'name'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
