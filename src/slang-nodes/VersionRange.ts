import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpression } from './VersionExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class VersionRange implements SlangNode {
  readonly kind = NonterminalKind.VersionRange;

  comments;

  loc;

  leftOperand: VersionExpression;

  operator: string;

  rightOperand: VersionExpression;

  constructor(ast: ast.VersionRange, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.leftOperand = new VersionExpression(ast.leftOperand, offsets[0]);
    this.operator = ast.operator.text;
    this.rightOperand = new VersionExpression(ast.rightOperand, offsets[1]);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VersionRange>, print: PrintFunction): Doc {
    return [
      path.call(print, 'leftOperand'),
      ` ${this.operator} `,
      path.call(print, 'rightOperand')
    ];
  }
}
