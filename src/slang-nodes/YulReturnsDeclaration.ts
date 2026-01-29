import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { SlangNode } from './SlangNode.js';
import { YulVariableNames } from './YulVariableNames.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class YulReturnsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.YulReturnsDeclaration;

  variables: YulVariableNames;

  constructor(ast: ast.YulReturnsDeclaration, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.variables = new YulVariableNames(ast.variables, options);

    this.updateMetadata(this.variables);
  }

  print(path: AstPath<YulReturnsDeclaration>, print: PrintFunction): Doc {
    return printSeparatedItem(['->', path.call(print, 'variables')], {
      firstSeparator: line
    });
  }
}
