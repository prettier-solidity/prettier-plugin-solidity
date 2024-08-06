import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class EventParameter implements SlangNode {
  readonly kind = NonterminalKind.EventParameter;

  comments;

  loc;

  typeName: TypeName;

  indexedKeyword?: string;

  name?: string;

  constructor(
    ast: ast.EventParameter,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.indexedKeyword = ast.indexedKeyword?.text;
    this.name = ast.name?.text;

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<EventParameter>, print: PrintFunction): Doc {
    return [
      path.call(print, 'typeName'),
      this.indexedKeyword ? ' indexed' : '',
      this.name ? ` ${this.name}` : ''
    ];
  }
}
