import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class ErrorParameter implements SlangNode {
  readonly kind = NonterminalKind.ErrorParameter;

  comments;

  loc;

  typeName: TypeName;

  name?: string;

  constructor(
    ast: ast.ErrorParameter,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.name = ast.name?.text;

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ErrorParameter>, print: PrintFunction): Doc {
    return [path.call(print, 'typeName'), this.name ? ` ${this.name}` : ''];
  }
}
