import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { InheritanceTypes } from './InheritanceTypes.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class InheritanceSpecifier implements SlangNode {
  readonly kind = NonterminalKind.InheritanceSpecifier;

  comments;

  loc;

  isKeyword: string;

  types: InheritanceTypes;

  constructor(
    ast: ast.InheritanceSpecifier,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.isKeyword = ast.isKeyword?.text;
    this.types = new InheritanceTypes(ast.types, offsets[0], options);

    metadata = updateMetadata(metadata, [this.types]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [this.isKeyword, path.call(print, 'types')];
  }
}
