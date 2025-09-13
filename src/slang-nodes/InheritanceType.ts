import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class InheritanceType extends SlangNode {
  readonly kind = NonterminalKind.InheritanceType;

  typeName: IdentifierPath;

  arguments?: ArgumentsDeclaration;

  constructor(ast: ast.InheritanceType, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new IdentifierPath(ast.typeName);
    if (ast.arguments) {
      this.arguments = new ArgumentsDeclaration(ast.arguments, options);
    }

    this.updateMetadata(this.typeName, this.arguments);
  }

  print(path: AstPath<InheritanceType>, print: PrintFunction): Doc {
    return [
      path.call(print, 'typeName'),
      path.call(printVariant(print), 'arguments')
    ];
  }
}
