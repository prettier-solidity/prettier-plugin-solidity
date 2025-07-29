import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, line } = doc.builders;

const isIfStatementOrBlock = createKindCheckFunction([
  NonterminalKind.Block,
  NonterminalKind.IfStatement
]);

export class ElseBranch extends SlangNode {
  readonly kind = NonterminalKind.ElseBranch;

  body: Statement['variant'];

  constructor(ast: ast.ElseBranch, options: ParserOptions<AstNode>) {
    super(ast);

    this.body = extractVariant<typeof Statement>(Statement, ast.body, options);

    this.updateMetadata(this.body);
  }

  print(path: AstPath<ElseBranch>, print: PrintFunction): Doc {
    const body = path.call(print, 'body');
    return [
      'else',
      isIfStatementOrBlock(this.body)
        ? [' ', body]
        : group(indent([line, body]))
    ];
  }
}
