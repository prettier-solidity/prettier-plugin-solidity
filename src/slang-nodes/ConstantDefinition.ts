import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { TerminalNode } from './TerminalNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ConstantDefinition extends SlangNode {
  readonly kind = NonterminalKind.ConstantDefinition;

  typeName: TypeName;

  name: TerminalNode;

  value: Expression;

  constructor(ast: ast.ConstantDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new TypeName(ast.typeName, options);
    this.name = new TerminalNode(ast.name);
    this.value = new Expression(ast.value, options);

    this.updateMetadata(this.typeName, this.value);
  }

  print(path: AstPath<ConstantDefinition>, print: PrintFunction): Doc {
    return [
      printVariant('typeName', path, print),
      ' constant ',
      path.call(print, 'name'),
      ' = ',
      printVariant('value', path, print),
      ';'
    ];
  }
}
