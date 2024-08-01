import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulReturnVariables } from './YulReturnVariables.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { line } = doc.builders;

export class YulReturnsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.YulReturnsDeclaration;

  comments;

  loc;

  minusGreaterThan: string;

  variables: YulReturnVariables;

  constructor(ast: ast.YulReturnsDeclaration, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.minusGreaterThan = ast.minusGreaterThan.text;
    this.variables = new YulReturnVariables(ast.variables, offsets[0]);

    metadata = updateMetadata(metadata, [this.variables]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<YulReturnsDeclaration>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return printSeparatedItem(
      [this.minusGreaterThan, path.call(print, 'variables')],
      {
        firstSeparator: line
      }
    );
  }
}
