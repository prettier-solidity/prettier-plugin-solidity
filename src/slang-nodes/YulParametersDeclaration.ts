import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulParameters } from './YulParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class YulParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.YulParametersDeclaration;

  parameters: YulParameters;

  constructor(ast: ast.YulParametersDeclaration) {
    super(ast);

    this.parameters = new YulParameters(ast.parameters);

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<YulParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
