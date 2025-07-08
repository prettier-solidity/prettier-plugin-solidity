import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EventParameters } from './EventParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class EventParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.EventParametersDeclaration;

  comments;

  loc;

  parameters: EventParameters;

  constructor(
    ast: ast.EventParametersDeclaration,
    options: ParserOptions<AstNode>
  ) {
    const metadata = getNodeMetadata(ast);

    this.parameters = new EventParameters(ast.parameters, options);

    [this.loc, this.comments] = updateMetadata(metadata, [this.parameters]);
  }

  print(path: AstPath<EventParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
