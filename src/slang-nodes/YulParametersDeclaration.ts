import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulParameters } from './YulParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

export class YulParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.YulParametersDeclaration;

  parameters: YulParameters;

  constructor(
    ast: ast.YulParametersDeclaration,
    options: ParserOptions<AstNode>
  ) {
    super(ast, options);

    this.parameters = new YulParameters(ast.parameters, options);

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<YulParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
