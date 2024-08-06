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

  name: string;

  valueType: ElementaryType;

  constructor(ast: ast.UserDefinedValueTypeDefinition, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = ast.name.text;
    this.valueType = new ElementaryType(ast.valueType, offsets[0]);

    metadata = updateMetadata(metadata, [this.valueType]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<UserDefinedValueTypeDefinition>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [`type ${this.name} is `, path.call(print, 'valueType'), ';'];
  }
}
