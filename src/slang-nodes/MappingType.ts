import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { MappingKey } from './MappingKey.js';
import { MappingValue } from './MappingValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class MappingType implements SlangNode {
  readonly kind = NonterminalKind.MappingType;

  comments;

  loc;

  mappingKeyword: string;

  openParen: string;

  keyType: MappingKey;

  equalGreaterThan: string;

  valueType: MappingValue;

  closeParen: string;

  constructor(
    ast: ast.MappingType,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.mappingKeyword = ast.mappingKeyword.text;
    this.openParen = ast.openParen.text;
    this.keyType = new MappingKey(ast.keyType, offsets[0]);
    this.equalGreaterThan = ast.equalGreaterThan.text;
    this.valueType = new MappingValue(ast.valueType, offsets[1], options);
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.keyType, this.valueType]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<MappingType>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      `${this.mappingKeyword}${this.openParen}`,
      path.call(print, 'keyType'),
      ` ${this.equalGreaterThan} `,
      path.call(print, 'valueType'),
      this.closeParen
    ];
  }
}
