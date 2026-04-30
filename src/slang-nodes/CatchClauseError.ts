import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { group } = doc.builders;

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
