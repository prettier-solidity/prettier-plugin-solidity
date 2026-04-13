import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ModifierInvocation extends SlangNode {
  readonly kind = NonterminalKind.ModifierInvocation;

  name: IdentifierPath;

  arguments?: ArgumentsDeclaration['variant'];

  constructor(
    ast: ast.ModifierInvocation,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.name = new IdentifierPath(ast.name, collected);
    if (ast.arguments) {
      this.arguments = extractVariant(
        new ArgumentsDeclaration(ast.arguments, collected, options)
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
    return [print('name'), this.arguments ? print('arguments') : ''];
  }
}
