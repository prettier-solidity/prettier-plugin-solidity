import { doc } from 'prettier';
import { isLabel } from '../common/util.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

const { group, indentIfBreak, label } = doc.builders;

export class FunctionCallExpression extends SlangNode {
  operand;

  arguments;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { operand } = ast;
      this.operand = new Expression(
        operand,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.arguments = new ArgumentsDeclaration(
        ast.arguments,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    let operandDoc = path.call(print, 'operand');
    let argumentsDoc = path.call(print, 'arguments');

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operandDoc) && operandDoc.label === 'MemberAccessChain') {
      operandDoc = group(operandDoc.contents, {
        id: Symbol('FunctionCallExpression.operand')
      });

      argumentsDoc = indentIfBreak(argumentsDoc, {
        groupId: operandDoc.id
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [operandDoc, argumentsDoc]);
    }

    return [operandDoc, argumentsDoc].flat();
  }
}
