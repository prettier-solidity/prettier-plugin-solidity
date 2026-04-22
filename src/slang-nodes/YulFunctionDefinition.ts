import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { YulParametersDeclaration } from './YulParametersDeclaration.js';
import { YulReturnsDeclaration } from './YulReturnsDeclaration.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.YulFunctionDefinition;

  name: TerminalNode;

  parameters: YulParametersDeclaration;

  returns?: YulReturnsDeclaration;

  body: YulBlock;

  constructor(ast: ast.YulFunctionDefinition, collected: CollectedMetadata) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    this.parameters = new YulParametersDeclaration(ast.parameters, collected);
    if (ast.returns) {
      this.returns = new YulReturnsDeclaration(ast.returns, collected);
    }
    this.body = new YulBlock(ast.body, collected);

    this.updateMetadata(this.parameters, this.returns, this.body);
  }

  print(print: PrintFunction): Doc {
    return [
      'function ',
      print('name'),
      print('parameters'),
      print('returns') || ' ',
      print('body')
    ];
  }
}
