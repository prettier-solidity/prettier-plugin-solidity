import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { IdentifierPath } from './IdentifierPath.ts';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ModifierInvocation extends SlangNode {
  readonly kind = NonterminalKind.ModifierInvocation;

  name: IdentifierPath;

  arguments?: ArgumentsDeclaration['variant'];

  constructor(ast: ast.ModifierInvocation, collected: CollectedMetadata) {
    super(ast, collected);

    this.name = new IdentifierPath(ast.name, collected);
    if (ast.arguments) {
      this.arguments = extractVariant(
        new ArgumentsDeclaration(ast.arguments, collected)
      );
    }

    this.updateMetadata(this.name, this.arguments);
  }

  cleanModifierInvocationArguments(): void {
    if (
      this.arguments?.kind === NonterminalKind.PositionalArgumentsDeclaration &&
      this.arguments.isEmpty
    ) {
      this.arguments = undefined;
    }
  }

  print(print: PrintFunction): Doc {
    return [print('name'), print('arguments')];
  }
}
