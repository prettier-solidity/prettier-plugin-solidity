import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { isLabel } from '../common/util.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { IndexAccessEnd } from './IndexAccessEnd.js';

const { group, indent, indentIfBreak, label, softline } = doc.builders;

export class IndexAccessExpression extends SlangNode {
  get kind() {
    return NonterminalKind.IndexAccessExpression;
  }

  operand;

  openBracket;

  start;

  end;

  closeBracket;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = 0;
      const children = {
        operand: new Expression(ast.operand, offsets[0], options),
        openBracket: ast.openBracket.text,
        start: ast.start
          ? new Expression(ast.start, offsets[(i += 1)], options)
          : undefined,
        end: ast.end
          ? new IndexAccessEnd(ast.end, offsets[(i += 1)], options)
          : undefined,
        closeBracket: ast.closeBracket.text
      };
      return children;
    };

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    let operandDoc = path.call(print, 'operand');
    let indexDoc = group([
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
        groupId: operandDoc.id
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [operandDoc, indexDoc]);
    }

    return [operandDoc, indexDoc].flat();
  }
}
