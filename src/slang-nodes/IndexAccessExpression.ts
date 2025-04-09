import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { isLabel } from '../slang-utils/is-label.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';
import { IndexAccessEnd } from './IndexAccessEnd.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, indentIfBreak, label, softline } = doc.builders;

export class IndexAccessExpression implements SlangNode {
  readonly kind = NonterminalKind.IndexAccessExpression;

  comments;

  loc;

  operand: Expression;

  start?: Expression;

  end?: IndexAccessEnd;

  constructor(ast: ast.IndexAccessExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.operand = new Expression(ast.operand, options);
    if (ast.start) {
      this.start = new Expression(ast.start, options);
    }
    if (ast.end) {
      this.end = new IndexAccessEnd(ast.end, options);
    }

    metadata = updateMetadata(metadata, [this.operand, this.start, this.end]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<IndexAccessExpression>, print: PrintFunction): Doc {
    let operandDoc: Doc = path.call(print, 'operand');
    let indexDoc: Doc = group([
      '[',
      indent([softline, path.call(print, 'start'), path.call(print, 'end')]),
      softline,
      ']'
    ]);

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operandDoc) && operandDoc.label === 'MemberAccessChain') {
      const groupId = Symbol('Slang.IndexAccessExpression.operand');
      operandDoc = group(operandDoc.contents, { id: groupId });

      indexDoc = indentIfBreak(indexDoc, { groupId });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [operandDoc, indexDoc]);
    }

    return [operandDoc, indexDoc].flat();
  }
}
