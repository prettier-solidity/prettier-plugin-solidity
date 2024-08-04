import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

const { group } = doc.builders;

export class CatchClauseError implements SlangNode {
  readonly kind = NonterminalKind.CatchClauseError;

  comments;

  loc;

  name?: string;

  parameters: ParametersDeclaration;

  constructor(
    ast: ast.CatchClauseError,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = ast.name?.text;
    this.parameters = new ParametersDeclaration(
      ast.parameters,
      offsets[0],
      options
    );

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<CatchClauseError>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [`${this.name ?? ''}`, group(path.call(print, 'parameters')), ' '];
  }
}