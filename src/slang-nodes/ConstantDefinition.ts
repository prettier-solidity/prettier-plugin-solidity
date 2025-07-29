const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ConstantDefinition extends SlangNode {
  readonly kind = NonterminalKind.ConstantDefinition;

  typeName: TypeName;

  name: Identifier;

  value: Expression;

  constructor(ast: ast.ConstantDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new TypeName(ast.typeName, options);
    this.name = new Identifier(ast.name);
    this.value = new Expression(ast.value, options);

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
