import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.ts';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { Statement } from './Statement.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const isIfStatementOrBlock = createKindCheckFunction([
  NonterminalKind.Block,
  NonterminalKind.IfStatement
]);

export class ElseBranch extends SlangNode {
  readonly kind = NonterminalKind.ElseBranch;

  body: Statement['variant'];

  constructor(ast: ast.ElseBranch, collected: CollectedMetadata) {
    super(ast, collected);

    this.body = extractVariant(new Statement(ast.body, collected));

    this.updateMetadata(this.body);
  }

  print(print: PrintFunction): Doc {
    return [
      'else',
      printIndentedGroupOrSpacedDocument(
        print('body'),
        !isIfStatementOrBlock(this.body)
      )
    ];
  }
}
