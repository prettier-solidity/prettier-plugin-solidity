import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { NamedArgumentGroup } from './NamedArgumentGroup.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class NamedArgumentsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.NamedArgumentsDeclaration;

  comments;

  loc;

  arguments?: NamedArgumentGroup;

  constructor(
    ast: ast.NamedArgumentsDeclaration,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    if (ast.arguments) {
      this.arguments = new NamedArgumentGroup(
        ast.arguments,
        offsets[0],
        options
      );
    }

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<NamedArgumentsDeclaration>, print: PrintFunction): Doc {
    return ['(', this.arguments ? path.call(print, 'arguments') : '', ')'];
  }
}
