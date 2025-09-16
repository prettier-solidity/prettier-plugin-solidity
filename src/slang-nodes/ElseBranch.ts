import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const isIfStatementOrBlock = createKindCheckFunction([
  NonterminalKind.Block,
  NonterminalKind.IfStatement
]);

export class ElseBranch extends SlangNode {
  readonly kind = NonterminalKind.ElseBranch;

  body: Statement['variant'];

  constructor(ast: ast.ElseBranch, options: ParserOptions<AstNode>) {
    super(ast);

    this.body = extractVariant(new Statement(ast.body, options));

    this.updateMetadata(this.body);
  }

  print(path: AstPath<ElseBranch>, print: PrintFunction): Doc {
    return [
      'else',
      printIndentedGroupOrSpacedDocument(
        path.call(print, 'body'),
        !isIfStatementOrBlock(this.body)
      )
    ];
  }
}
