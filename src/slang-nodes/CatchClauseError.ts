import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group } = doc.builders;

export class CatchClauseError implements SlangNode {
  readonly kind = NonterminalKind.CatchClauseError;

  comments;

  loc;

  name?: Identifier;

  parameters: ParametersDeclaration;

  constructor(
    ast: ast.CatchClauseError,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    let i = 0;
    if (ast.name) {
      this.name = new Identifier(ast.name, offsets[i]);
      i += 1;
    }
    this.parameters = new ParametersDeclaration(
      ast.parameters,
      offsets[i],
      options
    );

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<CatchClauseError>, print: PrintFunction): Doc {
    return [
      path.call(print, 'name'),
      group(path.call(print, 'parameters')),
      ' '
    ];
  }
}
