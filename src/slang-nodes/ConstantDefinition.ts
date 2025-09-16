import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { TerminalNode } from './TerminalNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ConstantDefinition extends SlangNode {
  readonly kind = NonterminalKind.ConstantDefinition;

  typeName: TypeName['variant'];

  name: TerminalNode;

  value: Expression['variant'];

  constructor(ast: ast.ConstantDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = extractVariant(new TypeName(ast.typeName, options));
    this.name = new TerminalNode(ast.name);
    this.value = extractVariant(new Expression(ast.value, options));

    this.updateMetadata(this.typeName, this.value);
  }

  print(path: AstPath<ConstantDefinition>, print: PrintFunction): Doc {
    return [
      path.call(print, 'typeName'),
      ' constant ',
      path.call(print, 'name'),
      ' = ',
      path.call(print, 'value'),
      ';'
    ];
  }
}
