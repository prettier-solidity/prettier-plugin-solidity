import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.js';
import type { PrintFunction, SlangNode } from '../types.js';

const { line } = doc.builders;

export class StorageLayoutSpecifier implements SlangNode {
  readonly kind = NonterminalKind.StorageLayoutSpecifier;

  comments;

  loc;

  expression: Expression;

  constructor(
    ast: ast.StorageLayoutSpecifier,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, true);

    this.expression = new Expression(ast.expression, options);

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<StorageLayoutSpecifier>, print: PrintFunction): Doc {
    return [
      'layout at',
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      })
    ];
  }
}
