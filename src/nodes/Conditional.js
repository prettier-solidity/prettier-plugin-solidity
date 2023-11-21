import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, indent, line, ifBreak, hardline, hardlineWithoutBreakParent } =
  doc.builders;

let groupIndex = 0;
const experimentalTernaries = (node, path, print) => {
  const parent = path.getParentNode();

  const falseExpressionIsConditional =
    node.falseExpression.type === 'Conditional';
  const trueExpressionIsConditional =
    node.trueExpression.type === 'Conditional';

  const conditionDoc = path.call(print, 'condition');
  const conditionGroup = group(
    [
      parent.type === 'Conditional' && parent.trueExpression === node
        ? hardlineWithoutBreakParent
        : '',
      ifBreak(['(', printSeparatedItem(conditionDoc), ')'], conditionDoc),
      ' ?'
    ],
    { id: `Conditional.condition-${groupIndex}` }
  );

  groupIndex += 1;

  const expressionSeparator = ifBreak(
    ['Conditional', 'VariableDeclarationStatement', 'ReturnStatement'].includes(
      parent.type
    )
      ? hardlineWithoutBreakParent
      : hardline,
    line,
    { groupId: conditionGroup.id }
  );

  const document = group([
    conditionGroup,
    group(
      indent([
        trueExpressionIsConditional ? '' : expressionSeparator,
        path.call(print, 'trueExpression')
      ])
    ),
    parent.type === 'Conditional' || falseExpressionIsConditional
      ? hardlineWithoutBreakParent
      : expressionSeparator,
    ': ',
    path.call(print, 'falseExpression')
  ]);

  return parent.type === 'VariableDeclarationStatement'
    ? ifBreak(
        indent([
          trueExpressionIsConditional || falseExpressionIsConditional
            ? hardline
            : line,
          document
        ]),
        document
      )
    : document;
};

const traditionalTernaries = (path, print) =>
  group([
    path.call(print, 'condition'),
    indent([
      path.getParentNode().type === 'Conditional' ? hardline : line,
      '? ',
      path.call(print, 'trueExpression'),
      line,
      ': ',
      path.call(print, 'falseExpression')
    ])
  ]);

export const Conditional = {
  print: ({ node, path, print, options }) =>
    options.experimentalTernaries
      ? experimentalTernaries(node, path, print)
      : traditionalTernaries(path, print)
};
