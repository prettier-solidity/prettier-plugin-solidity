import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { IdentifierPath } from './IdentifierPath.ts';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class InheritanceType extends SlangNode {
  readonly kind = NonterminalKind.InheritanceType;

  typeName: IdentifierPath;

  arguments?: ArgumentsDeclaration['variant'];

  constructor(ast: ast.InheritanceType, collected: CollectedMetadata) {
    super(ast, collected);

    this.typeName = new IdentifierPath(ast.typeName, collected);
    if (ast.arguments) {
      this.arguments = extractVariant(
        new ArgumentsDeclaration(ast.arguments, collected)
      );
    }

    this.updateMetadata(this.typeName, this.arguments);
  }

  print(print: PrintFunction): Doc {
    return [print('typeName'), print('arguments')];
  }
}
