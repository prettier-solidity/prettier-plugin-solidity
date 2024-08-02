import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ElementaryType } from './ElementaryType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class UserDefinedValueTypeDefinition implements SlangNode {
  readonly kind = NonterminalKind.UserDefinedValueTypeDefinition;

  comments;

  loc;

  typeKeyword: string;

  name: string;

  isKeyword: string;

  valueType: ElementaryType;

  semicolon: string;

  constructor(ast: ast.UserDefinedValueTypeDefinition, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeKeyword = ast.typeKeyword.text;
    this.name = ast.name.text;
    this.isKeyword = ast.isKeyword.text;
    this.valueType = new ElementaryType(ast.valueType, offsets[0]);
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.valueType]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<UserDefinedValueTypeDefinition>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      `${this.typeKeyword} ${this.name} ${this.isKeyword} `,
      path.call(print, 'valueType'),
      this.semicolon
    ];
  }
}
