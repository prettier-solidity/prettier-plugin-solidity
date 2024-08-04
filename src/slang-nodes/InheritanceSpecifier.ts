import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { InheritanceTypes } from './InheritanceTypes.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class InheritanceSpecifier implements SlangNode {
  readonly kind = NonterminalKind.InheritanceSpecifier;

  comments;

  loc;

  isKeyword: string;

  types: InheritanceTypes;

  constructor(
    ast: ast.InheritanceSpecifier,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.isKeyword = ast.isKeyword?.text;
    this.types = new InheritanceTypes(ast.types, offsets[0], options);

    metadata = updateMetadata(metadata, [this.types]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<InheritanceSpecifier>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [this.isKeyword, path.call(print, 'types')];
  }
}