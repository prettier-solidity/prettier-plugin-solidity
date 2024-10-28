import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulParameters } from './YulParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.YulParametersDeclaration;

  comments;

  loc;

  parameters: YulParameters;

  constructor(ast: ast.YulParametersDeclaration) {
    let metadata = getNodeMetadata(ast);

    this.parameters = new YulParameters(ast.parameters);

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
