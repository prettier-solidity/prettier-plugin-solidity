import { doc } from 'prettier';
import { isLabel } from '../common/util.js';

const { group, indentIfBreak, label } = doc.builders;

let groupIndex = 0;
export const FunctionCallExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    arguments: parse(ast.arguments, options, parse)
  }),
  print: ({ path, print }) => {
    let operandDoc = path.call(print, 'operand');
    let argumentsDoc = path.call(print, 'arguments');

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operandDoc) && operandDoc.label === 'MemberAccessChain') {
      operandDoc = group(operandDoc.contents, {
        id: `FunctionCall.expression-${groupIndex}`
      });

      groupIndex += 1;

      argumentsDoc = indentIfBreak(argumentsDoc, {
        groupId: operandDoc.id
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [operandDoc, argumentsDoc]);
    }

    return [operandDoc, argumentsDoc];
  }
};
