const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulSwitchCases } from './YulSwitchCases.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class YulSwitchStatement extends SlangNode {
  readonly kind = NonterminalKind.YulSwitchStatement;

  expression: YulExpression;

  cases: YulSwitchCases;

  constructor(ast: ast.YulSwitchStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.expression = new YulExpression(ast.expression, options);
    this.cases = new YulSwitchCases(ast.cases, options);

    this.updateMetadata(this.expression, this.cases);
  }

  print(path: AstPath<YulSwitchStatement>, print: PrintFunction): Doc {
    return [
      'switch ',
      path.call(print, 'expression'),
      hardline,
      path.call(print, 'cases')
    ];
  }
}
