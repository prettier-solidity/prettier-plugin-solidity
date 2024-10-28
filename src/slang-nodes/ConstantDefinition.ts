import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ConstantDefinition implements SlangNode {
  readonly kind = NonterminalKind.ConstantDefinition;

  comments;

  loc;

  typeName: TypeName;

  name: Identifier;

  value: Expression;

  constructor(ast: ast.ConstantDefinition, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName, options);
    this.name = new Identifier(ast.name);
    this.value = new Expression(ast.value, options);

    metadata = updateMetadata(metadata, [this.typeName, this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
