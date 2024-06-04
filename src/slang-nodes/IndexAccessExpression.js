import { doc } from 'prettier';
import { isLabel } from '../common/util.js';

const { group, indent, indentIfBreak, label, softline } = doc.builders;

let groupIndex = 0;
export const IndexAccessExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    openBracket: ast.openBracket.text,
    start: ast.start ? parse(ast.start, options, parse) : undefined,
    end: ast.end ? parse(ast.end, options, parse) : undefined,
    closeBracket: ast.closeBracket.text
  }),
  print: ({ node, path, print }) => {
    let operandDoc = path.call(print, 'operand');
    let indexDoc = group([
      node.openBracket,
      indent([
        softline,
        node.start ? path.call(print, 'start') : '',
        node.end ? path.call(print, 'end') : ''
      ]),
      softline,
      node.closeBracket
    ]);

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(operandDoc) && operandDoc.label === 'MemberAccessChain') {
      operandDoc = group(operandDoc.contents, {
        id: `IndexAccess.base-${groupIndex}`
      });

      groupIndex += 1;

      indexDoc = indentIfBreak(indexDoc, {
        groupId: operandDoc.id
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [operandDoc, indexDoc]);
    }

    return [operandDoc, indexDoc];
  }
};
