import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { group } from '../slang-printers/prettier-builders.ts';
import { SlangNode } from './SlangNode.ts';
import { TerminalNode } from './TerminalNode.ts';
import { ParametersDeclaration } from './ParametersDeclaration.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class CatchClauseError extends SlangNode {
  readonly kind = NonterminalKind.CatchClauseError;

  name?: TerminalNode;

  parameters: ParametersDeclaration;

  constructor(ast: ast.CatchClauseError, collected: CollectedMetadata) {
    super(ast, collected);

    if (ast.name) {
      this.name = new TerminalNode(ast.name, collected);
    }
    this.parameters = new ParametersDeclaration(ast.parameters, collected);

    this.updateMetadata(this.parameters);
  }

  print(print: PrintFunction): Doc {
    return [print('name'), group(print('parameters')), ' '];
  }
}
