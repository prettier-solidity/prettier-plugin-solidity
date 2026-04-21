import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';

import type { ast } from '@nomicfoundation/slang';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export abstract class StatementWithIndentedBody extends SlangNode {
  body: Statement['variant'];

  protected constructor(
    ast: Extract<ast.Statement['variant'], { body: ast.Statement }>,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.body = extractVariant(new Statement(ast.body, collected));

    // Subclasses must call this.updateMetadata with this.body and other children
  }

  protected printBody(
    print: PrintFunction,
    groupOptions?: { shouldBreak?: boolean }
  ): Doc {
    return printIndentedGroupOrSpacedDocument(
      print('body'),
      this.body.kind !== NonterminalKind.Block,
      groupOptions
    );
  }
}
