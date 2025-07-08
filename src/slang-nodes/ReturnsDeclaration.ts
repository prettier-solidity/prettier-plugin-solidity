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
    const metadata = getNodeMetadata(ast);

    this.variables = new ParametersDeclaration(ast.variables, options);

    [this.loc, this.comments] = updateMetadata(metadata, [this.variables]);
  }

  print(path: AstPath<ReturnsDeclaration>, print: PrintFunction): Doc {
    return ['returns ', group(path.call(print, 'variables'))];
  }
}
