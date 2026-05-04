import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class RevertStatement extends SlangNode {
  readonly kind = NonterminalKind.RevertStatement;

  error: IdentifierPath;

  arguments: ArgumentsDeclaration['variant'];

  constructor(ast: ast.RevertStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.error = new IdentifierPath(ast.error, collected);
    this.arguments = extractVariant(
      new ArgumentsDeclaration(ast.arguments, collected)
    );

    this.updateMetadata(this.error, this.arguments);
  }

  print(print: PrintFunction): Doc {
    return ['revert ', print('error'), print('arguments'), ';'];
  }
}
