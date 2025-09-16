import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ModifierInvocation extends SlangNode {
  readonly kind = NonterminalKind.ModifierInvocation;

  name: IdentifierPath;

  arguments?: ArgumentsDeclaration['variant'];

  constructor(ast: ast.ModifierInvocation, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new IdentifierPath(ast.name);
    if (ast.arguments) {
      this.arguments = extractVariant(
        new ArgumentsDeclaration(ast.arguments, options)
      );
    }

    this.updateMetadata(this.name, this.arguments);
  }

  cleanModifierInvocationArguments(): void {
    if (
      this.arguments &&
      this.arguments.kind === NonterminalKind.PositionalArgumentsDeclaration &&
      this.arguments.isEmpty
    ) {
      delete this.arguments;
    }
  }

  print(path: AstPath<ModifierInvocation>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'arguments')];
  }
}
