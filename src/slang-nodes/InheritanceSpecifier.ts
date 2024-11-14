import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { InheritanceTypes } from './InheritanceTypes.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class InheritanceSpecifier implements SlangNode {
  readonly kind = NonterminalKind.InheritanceSpecifier;

  comments;

  loc;

  types: InheritanceTypes;

  constructor(ast: ast.InheritanceSpecifier, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.types = new InheritanceTypes(ast.types, options);

    metadata = updateMetadata(metadata, [this.types]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<InheritanceSpecifier>, print: PrintFunction): Doc {
    return ['is', path.call(print, 'types')];
  }
}
