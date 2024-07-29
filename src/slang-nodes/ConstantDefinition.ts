import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class ConstantDefinition implements SlangNode {
  readonly kind = NonterminalKind.ConstantDefinition;

  comments;

  loc;

  typeName: TypeName;

  constantKeyword: string;

  name: string;

  equal: string;

  value: Expression;

  semicolon: string;

  constructor(
    ast: ast.ConstantDefinition,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.constantKeyword = ast.constantKeyword.text;
    this.name = ast.name.text;
    this.equal = ast.equal.text;
    this.value = new Expression(ast.value, offsets[1], options);
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.typeName, this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  ): Doc {
    return ['TODO: ConstantDefinition'];
  }
}
