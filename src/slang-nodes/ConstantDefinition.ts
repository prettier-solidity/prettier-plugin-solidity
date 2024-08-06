import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { /*AstPath,*/ Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class ConstantDefinition implements SlangNode {
  readonly kind = NonterminalKind.ConstantDefinition;

  comments;

  loc;

  typeName: TypeName;

  name: string;

  value: Expression;

  constructor(
    ast: ast.ConstantDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.name = ast.name.text;
    this.value = new Expression(ast.value, offsets[1], options);

    metadata = updateMetadata(metadata, [this.typeName, this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(/*
    path: AstPath<ConstantDefinition>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  */): Doc {
    return ['TODO: ConstantDefinition'];
  }
}
