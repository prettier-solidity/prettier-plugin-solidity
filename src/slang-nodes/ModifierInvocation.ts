import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ModifierInvocation implements SlangNode {
  readonly kind = NonterminalKind.ModifierInvocation;

  comments;

  loc;

  name: IdentifierPath;

  arguments?: ArgumentsDeclaration;

  constructor(ast: ast.ModifierInvocation, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.name = new IdentifierPath(ast.name);
    if (ast.arguments) {
      this.arguments = new ArgumentsDeclaration(ast.arguments, options);
    }

    metadata = updateMetadata(metadata, [this.name, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  cleanModifierInvocationArguments(): void {
    if (
      this.arguments &&
      this.arguments.variant.kind ===
        NonterminalKind.PositionalArgumentsDeclaration &&
      this.arguments.variant.isEmpty()
    ) {
      delete this.arguments;
    }
  }

  print(path: AstPath<ModifierInvocation>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'arguments')];
  }
}
