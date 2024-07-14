import { doc } from 'prettier';
import { isLabel } from '../common/util.js';
import { SlangNode } from './SlangNode.js';

const { group, indent, indentIfBreak, label, softline } = doc.builders;

export class IndexAccessExpression extends SlangNode {
  operand;

  openBracket;

  start;

  end;

  closeBracket;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.closeBracket = ast.closeBracket.text;
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
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
