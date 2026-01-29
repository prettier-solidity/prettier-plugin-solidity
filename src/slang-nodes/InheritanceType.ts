import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class InheritanceType extends SlangNode {
  readonly kind = NonterminalKind.InheritanceType;

  typeName: IdentifierPath;

  arguments?: ArgumentsDeclaration['variant'];

  constructor(
    ast: ast.InheritanceType,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.typeName = new IdentifierPath(ast.typeName, collected);
    if (ast.arguments) {
      this.arguments = extractVariant(
        new ArgumentsDeclaration(ast.arguments, collected, options)
      );
    }

    this.updateMetadata(this.typeName, this.arguments);
  }

  print(path: AstPath<InheritanceType>, print: PrintFunction): Doc {
    return [path.call(print, 'typeName'), path.call(print, 'arguments')];
  }
}
