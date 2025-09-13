import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { YulParametersDeclaration } from './YulParametersDeclaration.js';
import { YulReturnsDeclaration } from './YulReturnsDeclaration.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulFunctionDefinition extends SlangNode {
  readonly kind = NonterminalKind.YulFunctionDefinition;

  name: TerminalNode;

  parameters: YulParametersDeclaration;

  returns?: YulReturnsDeclaration;

  body: YulBlock;

  constructor(ast: ast.YulFunctionDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new TerminalNode(ast.name);
    this.parameters = new YulParametersDeclaration(ast.parameters);
    if (ast.returns) {
      this.returns = new YulReturnsDeclaration(ast.returns);
    }
    this.body = new YulBlock(ast.body, options);

    this.updateMetadata(this.parameters, this.returns, this.body);
  }

  print(path: AstPath<YulFunctionDefinition>, print: PrintFunction): Doc {
    return [
      'function ',
      path.call(print, 'name'),
      path.call(print, 'parameters'),
      path.call(print, 'returns') || ' ',
      path.call(print, 'body')
    ];
  }
}
