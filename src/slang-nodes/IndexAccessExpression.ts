import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { isLabel } from '../slang-utils/is-label.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';
import { IndexAccessEnd } from './IndexAccessEnd.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { group, indent, indentIfBreak, label, softline } = doc.builders;

export class IndexAccessExpression implements SlangNode {
  readonly kind = NonterminalKind.IndexAccessExpression;

  comments;

  loc;

  operand: Expression;

  openBracket: string;

  start?: Expression;

  end?: IndexAccessEnd;

  closeBracket: string;

  constructor(
    ast: ast.IndexAccessExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.operand = new Expression(ast.operand, offsets[0], options);
    this.openBracket = ast.openBracket.text;
    let i = 1;
    if (ast.start) {
      this.start = new Expression(ast.start, offsets[i], options);
      i += 1;
    }
    if (ast.end) {
      this.end = new IndexAccessEnd(ast.end, offsets[i], options);
    }
    this.closeBracket = ast.closeBracket.text;

    metadata = updateMetadata(metadata, [this.operand, this.start, this.end]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    let operandDoc: Doc = path.call(print, 'operand');
    let indexDoc: Doc = group([
      this.openBracket,
      indent([
        softline,
        this.start ? path.call(print, 'start') : '',
        this.end ? path.call(print, 'end') : ''
      ]),
      softline,
      this.closeBracket
    ]);

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operandDoc) && operandDoc.label === 'MemberAccessChain') {
      operandDoc = group(operandDoc.contents, {
        id: Symbol('IndexAccessExpression.operand')
      });

      indexDoc = indentIfBreak(indexDoc, {
        groupId: operandDoc.id!
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [operandDoc, indexDoc]);
    }

    return [operandDoc, indexDoc].flat();
  }
}
