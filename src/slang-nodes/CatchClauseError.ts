import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { group } = doc.builders;

export class CatchClauseError extends SlangNode {
  readonly kind = NonterminalKind.CatchClauseError;

  name?: TerminalNode;

  parameters: ParametersDeclaration;

  constructor(ast: ast.CatchClauseError, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.name) {
      this.name = new TerminalNode(ast.name);
    }
    this.parameters = new ParametersDeclaration(ast.parameters, options);

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<CatchClauseError>, print: PrintFunction): Doc {
    return [
      path.call(print, 'name'),
      group(path.call(print, 'parameters')),
      ' '
    ];
  }
}
