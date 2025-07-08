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
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.parameters = new Parameters(ast.parameters, options);

    updateMetadata(this.loc, this.comments, [this.parameters]);
  }

  print(path: AstPath<ParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
