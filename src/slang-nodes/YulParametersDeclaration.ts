import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulParameters } from './YulParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.YulParametersDeclaration;

  parameters: YulParameters;

  constructor(ast: ast.YulParametersDeclaration, collected: CollectedMetadata) {
    super(ast, collected);

    this.parameters = new YulParameters(ast.parameters, collected);

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<YulParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
