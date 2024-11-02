import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulIdentifier } from './YulIdentifier.js';
import { YulParametersDeclaration } from './YulParametersDeclaration.js';
import { YulReturnsDeclaration } from './YulReturnsDeclaration.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulFunctionDefinition implements SlangNode {
  readonly kind = NonterminalKind.YulFunctionDefinition;

  comments;

  loc;

  name: YulIdentifier;

  parameters: YulParametersDeclaration;

  returns?: YulReturnsDeclaration;

  body: YulBlock;

  constructor(
    ast: ast.YulFunctionDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new YulIdentifier(ast.name, offsets[0]);
    this.parameters = new YulParametersDeclaration(ast.parameters, offsets[1]);
    let i = 2;
    if (ast.returns) {
      this.returns = new YulReturnsDeclaration(ast.returns, offsets[i]);
      i += 1;
    }
    this.body = new YulBlock(ast.body, offsets[i], options);

    metadata = updateMetadata(metadata, [
      this.parameters,
      this.returns,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
