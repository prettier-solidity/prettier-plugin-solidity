import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ErrorParameter extends SlangNode {
  readonly kind = NonterminalKind.ErrorParameter;

  typeName: TypeName;

  name?: TerminalNode;

  constructor(ast: ast.ErrorParameter, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new TypeName(ast.typeName, options);
    if (ast.name) {
      this.name = new TerminalNode(ast.name);
    }

    this.updateMetadata(this.typeName);
  }

  print(path: AstPath<ErrorParameter>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      printVariant('typeName', path, print),
      path.call(print, 'name')
    ]);
  }
}
