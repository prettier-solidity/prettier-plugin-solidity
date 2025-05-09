import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulExpression } from './YulExpression.js';
import { YulSwitchCases } from './YulSwitchCases.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { hardline } = doc.builders;

export class YulSwitchStatement implements SlangNode {
  readonly kind = NonterminalKind.YulSwitchStatement;

  comments;

  loc;

  expression: YulExpression;

  cases: YulSwitchCases;

  constructor(ast: ast.YulSwitchStatement) {
    let metadata = getNodeMetadata(ast);

    this.expression = new YulExpression(ast.expression);
    this.cases = new YulSwitchCases(ast.cases);

    metadata = updateMetadata(metadata, [this.expression, this.cases]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
