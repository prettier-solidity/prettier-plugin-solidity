import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Parameters } from './Parameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ParametersDeclaration;

  comments;

  loc;

  parameters: Parameters;

  constructor(ast: ast.ParametersDeclaration, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.parameters = new Parameters(ast.parameters, options);

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
