import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { YulParametersDeclaration } from './YulParametersDeclaration.js';
import { YulReturnsDeclaration } from './YulReturnsDeclaration.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulFunctionDefinition implements SlangNode {
  readonly kind = NonterminalKind.YulFunctionDefinition;

  comments;

  loc;

  functionKeyword;

  name;

  parameters: YulParametersDeclaration;

  returns?: YulReturnsDeclaration;

  body: YulBlock;

  constructor(
    ast: ast.YulFunctionDefinition,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.functionKeyword = ast.functionKeyword.text;
    this.name = ast.name.text;
    this.parameters = new YulParametersDeclaration(ast.parameters, offsets[0]);
    let i = 1;
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

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.functionKeyword} ${this.name}`,
      path.call(print, 'parameters'),
      this.returns ? path.call(print, 'returns') : ' ',
      path.call(print, 'body')
    ];
  }
}
