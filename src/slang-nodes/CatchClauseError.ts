import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group } = doc.builders;

export class CatchClauseError implements SlangNode {
  readonly kind = NonterminalKind.CatchClauseError;

  comments;

  loc;

  name?: Identifier;

  parameters: ParametersDeclaration;

  constructor(ast: ast.CatchClauseError, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    if (ast.name) {
      this.name = new Identifier(ast.name);
    }
    this.parameters = new ParametersDeclaration(ast.parameters, options);

    updateMetadata(this.loc, this.comments, [this.parameters]);
  }

  print(path: AstPath<CatchClauseError>, print: PrintFunction): Doc {
    return [
      path.call(print, 'name'),
      group(path.call(print, 'parameters')),
      ' '
    ];
  }
}
