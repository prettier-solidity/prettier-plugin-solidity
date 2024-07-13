import { doc } from 'prettier';
import { isLabel } from '../common/util.js';
import { SlangNode } from './SlangNode.js';

const { group, indentIfBreak, label } = doc.builders;

let groupIndex = 0;

export class FunctionCallExpression extends SlangNode {
  operand;

  arguments;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.operand = parse(ast.operand, parse, this.nextChildOffset);
    this.arguments = parse(ast.arguments, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    let operandDoc = path.call(print, 'operand');
    let argumentsDoc = path.call(print, 'arguments');

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operandDoc) && operandDoc.label === 'MemberAccessChain') {
      operandDoc = group(operandDoc.contents, {
        id: `FunctionCallExpression.operand-${groupIndex}`
      });

      groupIndex += 1;

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
