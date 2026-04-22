import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class EmitStatement extends SlangNode {
  readonly kind = NonterminalKind.EmitStatement;

  event: IdentifierPath;

  arguments: ArgumentsDeclaration['variant'];

  constructor(ast: ast.EmitStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.event = new IdentifierPath(ast.event, collected);
    this.arguments = extractVariant(
      new ArgumentsDeclaration(ast.arguments, collected)
    );

    this.updateMetadata(this.event, this.arguments);
  }

  print(print: PrintFunction): Doc {
    return ['emit ', print('event'), print('arguments'), ';'];
  }
}
