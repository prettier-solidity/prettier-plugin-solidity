import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

const { group } = doc.builders;

export class ReturnsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ReturnsDeclaration;

  comments;

  loc;

  variables: ParametersDeclaration;

  constructor(
    ast: ast.ReturnsDeclaration,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.variables = new ParametersDeclaration(
      ast.variables,
      offsets[0],
      options
    );

    metadata = updateMetadata(metadata, [this.variables]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ReturnsDeclaration>, print: PrintFunction): Doc {
    return ['returns ', group(path.call(print, 'variables'))];
  }
}
