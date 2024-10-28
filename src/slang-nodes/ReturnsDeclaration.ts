import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group } = doc.builders;

export class ReturnsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ReturnsDeclaration;

  comments;

  loc;

  variables: ParametersDeclaration;

  constructor(ast: ast.ReturnsDeclaration, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.variables = new ParametersDeclaration(ast.variables, options);

    metadata = updateMetadata(metadata, [this.variables]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ReturnsDeclaration>, print: PrintFunction): Doc {
    return ['returns ', group(path.call(print, 'variables'))];
  }
}
